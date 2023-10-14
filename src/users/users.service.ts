import { Injectable } from '@nestjs/common';
import axios from "axios";

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNkOTU0ZTkyMjAyY2FhNjdhNTAyMzdkMTRmZmJkMWM0MTQ2MGQ4M2ExMGZmODU5NjY1ZjdiNDI0M2Y4NDNkNTM3ZWNmOGZiNDQ5OTJmOTI5In0.eyJhdWQiOiI0MDgzM2ExZi01MDhjLTQ3YmYtOTQ0MS01YjI2ZjcxMjIyMGIiLCJqdGkiOiJjZDk1NGU5MjIwMmNhYTY3YTUwMjM3ZDE0ZmZiZDFjNDE0NjBkODNhMTBmZjg1OTY2NWY3YjQyNDNmODQzZDUzN2VjZjhmYjQ0OTkyZjkyOSIsImlhdCI6MTY5NzI2OTU5MywibmJmIjoxNjk3MjY5NTkzLCJleHAiOjE2OTczNTU5OTMsInN1YiI6IjEwMjA2MDQ2IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxMzQ3MDU4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXX0.n4D3ie42MQH0JIi9P3X1T1-qgwLLZ-e9oOIjA_q_kKv65q_XUtHDW1rR1wVzU0Db-9oROxJ-6GPKBi4f9n0QprqStYM95M_4PyOQrgxkIgbio_11kZ6u7fU9OysB_DSOChezMT5tZgfd7k8wWTUl5D40cICGXQcUZv-VAhISu1u4j9HXw6rN8grnrlGLX7I9pGiCEG55Ms2Fax46kfepiAcCLhKtR3J83ZHGQaK5zdrWj3BR3oDSKdcfy118wDDV4dP7JPK0Eyd4s9w2EjAEhCBihCFzBsJ_Qfmb3ddcnmO8LR7_CcBebB45uDDO3Sv-1EMesWi8tgEdfic5S6cq6A"
const secretKey = "CB4dgq6AR12djmbFgzXAyTNGj936a0B9aWUSlA9lIqNeqBtpVOIkqoJ1xhPd1Xx9"
const idApp = "40833a1f-508c-47bf-9441-5b26f712220b"

@Injectable()
export class UsersService {
  async createOrder(user) {
    await axios.post(`https://sangishievtgmailcom.amocrm.ru/api/v4/leads`, [{
      name: `Сделка на имя ${user.name}`,
      pipeline_id: 7353202
    }], {headers: {
        Authorization: `Bearer ${token}` }}).then(res=>console.log(res)).catch(err=>console.log(err.response.data['validation-errors'][0]))
  }
  async findPatchOrCreate(user) {
    const findOne = await axios.get(`https://sangishievtgmailcom.amocrm.ru/api/v4/contacts?query=${user.number}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        name: user.name,
        custom_fields_values: [
          {
            field_id: 327921,
            field_name: 'Email',
            field_code: 'EMAIL',
            field_type: 'multitext',
            values: [
              {
                value: user.email,
                enum_id: 181617,
                enum_code: 'WORK'
              }
            ]
          },
          {
            field_id: 327919,
            field_name: 'Телефон',
            field_code: 'PHONE',
            field_type: 'multitext',
            values: [
              {
                value: user.number,
                enum_id: 181605,
                enum_code: 'WORK'
              }
            ]
          }
        ]
      }
    })
    if(findOne.data === '') {
      await this.createContact(user)
    } else {
      const item = findOne.data._embedded.contacts[0]
      await this.editContact(item, user)
    }
  }

  async createContact(user) {
    await axios.post(`https://sangishievtgmailcom.amocrm.ru/api/v4/contacts`, [{
        name: user.name,
        custom_fields_values: [
          {
            field_name: 'Email',
            field_code: 'EMAIL',
            values: [
              {
                value: user.email
              }
            ]
          },
          {
            field_name: 'Телефон',
            field_code: 'PHONE',
            values: [
              {
                value: user.number
              }
            ]
          }
        ]
      }], {headers: {
        Authorization: `Bearer ${token}` }})
  }

  async editContact(user, newUser) {
    await axios.patch(`https://sangishievtgmailcom.amocrm.ru/api/v4/contacts/${user.id}`, {
        name: newUser.name,
        custom_fields_values: [
          {
            field_id: 327919,
            field_name: 'Телефон',
            field_code: 'PHONE',
            field_type: 'multitext',
            values: [
              {
                value: newUser.number,
                enum_id: 181605,
                enum_code: 'WORK'
              }
            ]
          },
          {
            field_id: 327921,
            field_name: 'Email',
            field_code: 'EMAIL',
            field_type: 'multitext',
            values: [
              {
                value: newUser.email,
                enum_id: 181617,
                enum_code: 'WORK'
              }
            ]
          }
        ]
      }, { headers: { Authorization: `Bearer ${token}` } })
    await this.createOrder(user)
  }
}