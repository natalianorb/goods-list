import { Good } from './Good';
import { idGenerator } from '../helpers/id-generator';

export class TableItem {
  constructor(public good: Good, public id?: string) {
    if (!id) {
      this.id = idGenerator();
    }
  }
}
