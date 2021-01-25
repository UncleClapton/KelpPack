const fs = require('fs');


function stemOrLog(mat) {
  if (['crimson', 'warped'].includes(mat)) {
    return 'stem'
  }

  return 'log'
}

const materials = [
  'acacia',
  'birch',
  'crimson',
  'dark_oak',
  'jungle',
  'oak',
  'spruce',
  'warped'
]

const types = {
  'barrel_tier_1': {
    pattern: [
      "PSP",
      "PIP",
      "PSP"
    ],
    key: (mat) => ({
      "P": {
        "item": `minecraft:${mat}_planks`
      },
      "S": {
        "item": `minecraft:${mat}_slab`
      },
      "I": {
        "tag": "forge:ingots/iron"
      }
    }),
    result: (mat) => ({
      "item": `storage_overhaul:${mat}_barrel_tier_1`
    })
  },
  'barrel_tier_2': {
    pattern: [
      "PSP",
      "PGP",
      "PSP"
    ],
    key: (mat) => ({
      "P": {
        "item": `minecraft:${mat}_planks`
      },
      "S": {
        "item": `minecraft:${mat}_slab`
      },
      "G": {
        "tag": "forge:ingots/gold"
      }
    }),
    result: (mat) => ({
      "item": `storage_overhaul:${mat}_barrel_tier_2`
    })
  },
  'barrel_tier_3': {
    pattern: [
      "PSP",
      "PDP",
      "PSP"
    ],
    key: (mat) => ({
      "P": {
        "item": `minecraft:${mat}_planks`
      },
      "S": {
        "item": `minecraft:${mat}_slab`
      },
      "D": {
        "tag": "forge:gems/diamond"
      }
    }),
    result: (mat) => ({
      "item": `storage_overhaul:${mat}_barrel_tier_3`
    })
  },
  'barrel': {
    "pattern": [
      "PSP",
      "P P",
      "PSP"
    ],
    key: (mat) =>({
      "P": {
        "item": `minecraft:${mat}_planks`
      },
      "S": {
        "item": `minecraft:${mat}_slab`
      }
    }),
    result: (mat) => ({
      "item": `storage_overhaul:${mat}_barrel`
    })
  },
  'chest_tier_1': {
    "pattern": [
      "PIP",
      "PPP",
      "PPP"
    ],
    "key": (mat) => ({
      "P": {
        "item": `minecraft:${mat}_planks`
      },
      "I": {
        "tag": "forge:ingots/iron"
      }
    }),
    "result": (mat) => ({
      "item": `storage_overhaul:${mat}_chest_tier_1`
    })
  },
  'chest_tier_2': {
    "pattern": [
      "PGP",
      "PPP",
      "PPP"
    ],
    "key": (mat) => ({
      "P": {
        "item": `minecraft:${mat}_planks`
      },
      "G": {
        "tag": "forge:ingots/gold"
      }
    }),
    "result": (mat) => ({
      "item": `storage_overhaul:${mat}_chest_tier_2`
    })
  },
  'chest_tier_3': {
    "pattern": [
      "PDP",
      "PPP",
      "PPP"
    ],
    "key": (mat) => ({
      "P": {
        "item": `minecraft:${mat}_planks`
      },
      "D": {
        "tag": "forge:gems/diamond"
      }
    }),
    "result": (mat) => ({
      "item": `storage_overhaul:${mat}_chest_tier_3`
    })
  },
  'chest': {
    disable: true
  },
  'storage_barrel': {
    "pattern": [
      "PSP",
      "L L",
      "PLP"
    ],
    "key": (mat) => ({
      "P": {
        "item": `minecraft:${mat}_planks`
      },
      "S": {
        "item": `minecraft:${mat}_slab`
      },
      "L": {
        "item": `minecraft:${mat}_${stemOrLog(mat)}`
      }
    }),
    "result": (mat) => ({
      "item": `storage_overhaul:${mat}_storage_barrel`
    })
  },
  'chest_minecart': {
    "pattern": [
      "C",
      "M"
    ],
    "key": (mat) => ({
      "C": {
        "item": `quark:${mat}_chest`
      },
      "M": {
        "item": `minecraft:minecart`
      }
    }),
    "result": (mat) => ({
      "item": `storage_overhaul:${mat}_chest_minecart`
    })
  }
}

const errCB = (err) => {
  if (err) {
    console.log('WHOOPS: ', err)
    throw new Error('I didnt spend enough time on this to warrant error recovery')
  }
}

materials.forEach((material) => {
  Object.entries(types).forEach(([type, conf]) => {
    const filename = `${material}_${type}.json`

    if (conf.disable) {
      fs.writeFile(filename, '', errCB)
      return
    }

    fs.writeFile(filename, `${JSON.stringify({
      type: "minecraft:crafting_shaped",
      pattern: conf.pattern,
      key: conf.key(material),
      result: conf.result(material)
    }, null, 2)}\n`, errCB)
  })
})



console.log('OKAY!')
