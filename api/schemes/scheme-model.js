const db = require('../../data/db-config');

async function find() { // EXERCISE A

  try {
    return db('schemes as sc')
      .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
      .groupBy('sc.scheme_id')
      .select('sc.*')
      .count('st.step_id as number_of_steps')
      .orderBy('sc.scheme_id');
  } catch (error) {
    console.log(error);
  }
}


async function findById(scheme_id) { // EXERCISE B

  try {
    const rows = await db('schemes as sc')
      .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
      .where('sc.scheme_id', scheme_id)
      .orderBy('st.step_number');

    const result = {
      scheme_id: Number(scheme_id),
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
}


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
async function findSteps(scheme_id) { // EXERCISE C
  // get all records from steps table ordered by step_number and add scheme_name from schemes table
  return db('steps as st')
    .leftJoin('schemes as sc', 'st.scheme_id', 'sc.scheme_id')
    .where('st.scheme_id', scheme_id)
    .orderBy('st.step_number')
    .select('st.*', 'sc.scheme_name')
    .then(rows => {
      return rows.map(row => ({
        step_id: row.step_id,
        step_number: row.step_number,
        instructions: row.instructions,
        scheme_name: row.scheme_name
      }));
    }
    )
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
