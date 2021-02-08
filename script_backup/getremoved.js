// THIS SCRIPT REQUIRES GLOB. YOU WILL NEED TO INSTALL IT VIA NPM BEFORE RUNNING

const fsP = require('fs').promises;
const glob = require('glob');





function walk () {
  const results = []

  glob("**/*.json", {
    ignore: [
      'node_modules/'
    ]
  }, async (err, files) => {
    if (err) {
      console.log("ERROR");
      console.log(err);
      return;
    }

    await Promise.all(files.map((fileName) => {
      const [mod, dataType, ...restParts] = fileName.split('.')[0].split('/');

      if (dataType !== 'recipes') {
        return Promise.resolve();
      }
      const recipeId = `${mod}:${restParts.join('/')}`

      return fsP.readFile(fileName, { encoding: 'utf-8' }).then((file) => {
        const trueLength = file.replace(/\r?\n|\r|\s/g, '').length;
        if (trueLength === 0) {
          if (trueLength !== file.length) {
            console.log(fileName, trueLength, file.length)
          }
          results.push(recipeId);
          return fsP.rm(fileName);
        }
      })
    }))


    fsP.writeFile('output.json', JSON.stringify(results, null, 2))

    console.log(results)
  })
}
walk();
