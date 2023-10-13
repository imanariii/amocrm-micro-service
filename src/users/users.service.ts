import { Injectable } from '@nestjs/common';
import axios from "axios";

@Injectable()
export class UsersService {
  async findOrCreate(user) {
    const res = await axios.get(`https://sangishievtgmailcom.amocrm.ru/api/v4/contacts?query=${user.number}`).then(res => {
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }
}