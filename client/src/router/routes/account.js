import {ACCOUNT, EMPLOYEE} from '@/constant/constRouter.js'
import Account from '@/views/account/Account.vue'
import Profile from '@/views/account/Profile.vue'
import Dashboard from '@/views/account/Dashboard.vue'
import Employee from '@/views/account/Employee/Employee.vue'
import EmployeeList from '@/views/account/Employee/List.vue'
import EmployeeAdd from '@/views/account/Employee/Add.vue'

let account = {
    path: ACCOUNT.ROOT_PATH,
    name: ACCOUNT.ROOT_NAME,
    component: Account,
    meta: {
        needToken: true,
    },
    children: [
        {
            path: ACCOUNT.PROFILE_PATH,
            name: ACCOUNT.PROFILE_NAME,
            component: Profile,
            meta: {
                title: 'profile'
            }
        },
        {
            path: ACCOUNT.DASHBOARD_PATH,
            name: ACCOUNT.DASHBOARD_NAME,
            component: Dashboard,
            meta: {
                title: 'dashboard'
            }
        },
        {
            path: EMPLOYEE.ROOT_PATH,
            name: EMPLOYEE.ROOT_NAME,
            component: Employee,
            meta: {
                title: 'employee'
            },
            children: [
                {
                    path: EMPLOYEE.LIST_PATH,
                    name: EMPLOYEE.LIST_NAME,
                    component: EmployeeList,
                    meta: {
                        title: 'list'
                    }
                },
                {
                    path: EMPLOYEE.ADD_PATH,
                    name: EMPLOYEE.ADD_NAME,
                    component: EmployeeAdd,
                    meta: {
                        title: 'add employee'
                    }
                },
            ],
        },
    ]
};

export default account;