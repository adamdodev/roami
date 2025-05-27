import { createStore } from 'tinybase/with-schemas';

// NB the 'with-schemas'

export default function RootLayout() {

  // const store = createStore().setValuesSchema({
  //   employees: { type: 'number' },
  //   open: { type: 'boolean', default: false },
  // });

  // store.setValues({ employees: 3 }); //                      OK
  // store.setValues({ employees: true }); //                   TypeScript error
  // store.setValues({ employees: 3, website: 'pets.com' }); // TypeScript error
  // store.setValues({ employees: 4 }); //                      OK

  // console.log(store.getValues());


  const tablesSchema = {
    pets: {
      name: { type: 'string' },
      species: { type: 'string' },
      sold: { type: 'boolean', default: false },
      added: { type: 'string', default: new Date().toISOString() },
    },
    tags: {
      text: { type: 'string' },
      added: { type: 'string', default: new Date().toISOString() },
    }
  } as const

  const store = createStore().setTablesSchema(tablesSchema);

  // useAndStartPersister(store);

  store.addRow('pets', { name: 'ted', species: 1 });


  return null;
}
