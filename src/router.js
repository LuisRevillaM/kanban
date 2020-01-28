const fs = require("fs");
const readline = require("readline");
const configFileName = process.argv[2];

fs.readFile(configFileName, "utf8", function(err, configData) {
  console.log("running");
  if (err) throw err;

  const declaredEndpoints = configData.split(/\n/);

  // get rid of potential bottom blank line
  if (declaredEndpoints[declaredEndpoints.length - 1] == "") {
    declaredEndpoints.pop();
  }

  const routes = declaredEndpoints.map(line => {
    const endpointData = line.split(" ");
    return {
      path: endpointData[0],
      name: endpointData[1]
    };
  });

  const routesObject = generateRoutesObject(routes);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on("line", function(line) {
    if (line !== "") {
      const requestPathComponents = getComponents(line).map(comp =>
        comp.toLowerCase()
      );

      // output matched endpoint or 404 to stdout
      console.log(findEndpoint(routesObject, requestPathComponents));
    }
  });
});

function getComponents(endpoint) {
  return endpoint.split("/").slice(1);
}

// turn array of endpoints into object with component-based hierarchy
function generateRoutesObject(routes) {
  return routes.reduce((acc, endpoint) => {
    const components = getComponents(endpoint.path).map(comp => {
      if (comp === "X") return comp;
      return comp.toLowerCase();
    });
    let currentLevel;
    const endpointObject = components.forEach((c, i) => {
      if (i === 0) {
        currentLevel = acc[c] || (acc[c] = {});
      } else {
        currentLevel = currentLevel[c] || (currentLevel[c] = {});
      }

      if (i === components.length - 1) {
        currentLevel["endpoint"] = endpoint.name;
      }
    });

    return acc;
  }, {});
}

function findEndpoint(routes, components) {
  if (!routes[components[0]] && !routes["X"]) return "404";

  if (components.length === 1) {
    if (routes[components[0]]) {
      const endpoint = routes[components[0]].endpoint || "404";

      if (endpoint !== "404") {
        return endpoint;
      }
    }
    if (routes["X"]) return routes["X"].endpoint || "404";
  }

  if (routes[components[0]]) {
    const endpoint = findEndpoint(routes[components[0]], components.slice(1));

    if (endpoint !== "404") {
      return endpoint;
    } else if (!routes["X"]) {
      return endpoint;
    }
  }

  if (routes["X"]) return findEndpoint(routes["X"], components.slice(1));
}
