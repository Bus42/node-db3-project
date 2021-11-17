const db = require('../../data/db-config');

async function find() { // EXERCISE A

  return db.select('*').from('schemes as sc')
    .count('st.step_id as number_of_steps')
    .leftJoin('steps as st', 'sc.scheme_id', '=', 'st.scheme_id')
    .groupBy('sc.scheme_id')
    .orderBy('sc.scheme_id');
}

async function findById(scheme_id) { // EXERCISE B

  try {
    const rows = await db.select('*').from('schemes as sc')
      .leftJoin('steps as st', 'sc.scheme_id', '=', 'st.scheme_id')
      .where('sc.scheme_id', scheme_id)
      .orderBy('st.step_number');

    const result = {
      scheme_id: rows[0].scheme_id,
      scheme_name: rows[0].scheme_name,
      steps: rows[0].step_id ? rows.map(row => ({
        step_id: row.step_id,
        step_number: row.step_number,
        instructions: row.instructions
      })
      )
        : []
    }
    return result;
  } catch (error) {
    console.log(error);
  }

  /*
  3B- Test in Postman and see that the resulting data does not look like a scheme,
  but more like an array of steps each including scheme information:
  
  [
    {
      "scheme_id": 1,
      "scheme_name": "World Domination",
      "step_id": 2,
      "step_number": 1,
      "instructions": "solve prime number theory"
    },
    {
      "scheme_id": 1,
      "scheme_name": "World Domination",
      "step_id": 1,
      "step_number": 2,
      "instructions": "crack cyber security"
    },
    // etc
  ]
  
  4B- Using the array obtained and vanilla JavaScript, create an object with
  the structure below, for the case _when steps exist_ for a given `scheme_id`:
  
  {
    "scheme_id": 1,
    "scheme_name": "World Domination",
    "steps": [
      {
        "step_id": 2,
        "step_number": 1,
        "instructions": "solve prime number theory"
      },
      {
        "step_id": 1,
        "step_number": 2,
        "instructions": "crack cyber security"
      },
      // etc
    ]
  }
  
  5B- This is what the result should look like _if there are no steps_ for a `scheme_id`:
  
  {
    "scheme_id": 7,
    "scheme_name": "Have Fun!",
    "steps": []
  }
  */


}


function findSteps(scheme_id) { // EXERCISE C
  /*
    1C- Build a query in Knex that returns the following data.
    The steps should be sorted by step_number, and the array
    should be empty if there are no steps for the scheme:

      [
        {
          "step_id": 5,
          "step_number": 1,
          "instructions": "collect all the sheep in Scotland",
          "scheme_name": "Get Rich Quick"
        },
        {
          "step_id": 4,
          "step_number": 2,
          "instructions": "profit",
          "scheme_name": "Get Rich Quick"
        }
      ]
  */
}

function add(scheme) { // EXERCISE D
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
}

function addStep(scheme_id, step) { // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
