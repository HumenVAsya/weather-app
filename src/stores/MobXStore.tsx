import { makeAutoObservable } from "mobx";

class MobXStore {
  place = "Cairo";
  count = 0

  constructor() {
    makeAutoObservable(this);
  }

  replace = (newPlace: string) => {
    this.place = newPlace;
  };

  add = () => {
    this.count++;
  };
}
export default new MobXStore();
