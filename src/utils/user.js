import Vue from 'vue';
class User {
  constructor(obj) {
    this.name = '';
    this.pre = null;
  }
  init({name, pre}) {
    this.name = name;
    this.pre = pre;
  }
}

export const Current = new User();
export const EventBus = new Vue();

