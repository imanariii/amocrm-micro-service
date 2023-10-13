import { Injectable } from '@nestjs/common';
import axios from "axios";

@Injectable()
export class UsersService {
  async findOrCreate(user) {
    const res = await axios.get('https://example.amocrm.ru/api/v4/contacts').then(res => {
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }
}