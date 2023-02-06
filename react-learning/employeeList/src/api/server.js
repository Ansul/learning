/* eslint-disable no-unused-vars */
import { Server, Model, Factory, hasMany, RestSerializer } from 'miragejs'


const IdSerializer = RestSerializer.extend({
  serializeIds: 'always',
})

const getFirstName = i => {
  const firstName = ["abc" , "Abc1", "Abc2", "efg", "ijk", "lmn", "opq", "rst", "abd", "dac"];
  return firstName[i];
}

const getLastName = i => {
  const lastName = ["xyz", "Xyz1", "Xyz2", "stu", "sut", "sml", "lmk", "nop", "lmn", "uvw"];
  return lastName[i];
}

const getAge = i => {
  const age = [30, 31, 32, 29, 28, 22, 40, 43, 51, 35];
  return age[i]
}

new Server({
  routes() {
    this.namespace = 'fakeApi'
    this.timing = 2000

    this.resource('employees')
  },
  models: {
    employee: Model.extend({}),
    list: Model.extend({
      employees: hasMany(),
    }),
  },
  factories: {
    employee: Factory.extend({
      id(i) {
        return Number(i)
      },
      firstName(i) {
        return getFirstName(i)
      },
      lastName(i) {
        return getLastName(i)
      },
      age(i) {
        return getAge(i)
      }
    }),
  },
  serializers: {
    employee: IdSerializer.extend({
      serialize(object, request) {
        const numerifyId = (employee) => {
          employee.id = Number(employee.id)
        }
        let json = IdSerializer.prototype.serialize.apply(this, arguments)

        if (json.employee) {
          numerifyId(json.employee)
        } else if (json.employees) {
          json.employees.forEach(numerifyId)
        }

        return json
      },
    }),
    list: IdSerializer,
  },
  seeds(server) {
    server.createList('employee', 10)
  },
})
