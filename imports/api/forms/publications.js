import { Meteor } from 'meteor/meteor';

import { DataFormIndividual } from './collections'

Meteor.publish('formIndividualData', function () {
  if (this.userId) {
    return DataFormIndividual.find({ userId: this.userId })
  }
})