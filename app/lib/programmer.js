import Ember from 'ember';

export default Ember.Object.extend({
  firstName: null,
  lastName: null,
  age: null,
  email: null,
  greet: function(){
    return `Hi, My name is ${this.firstName} ${this.lastName}. You can call me ${this.nickName}`;
  },
  isOld: Ember.computed('age', function(){
    if (this.age > 30){
      return true;
    } else {
      return false;
    }
  }),
  wroteRuby: Ember.computed('authorOf', function(){
    if (this.authorOf === 'Ruby'){
      return true;
    } else{
      return false;
    }
  }),
  addConference: function(conferenceName){
    this.conferences.push(conferenceName);
  },
  keyNoteConferences: Ember.computed('conferences.@each.keyNote', function(){
    var programmerName = `${this.firstName} ${this.lastName}`
    var myKeyNotes = this.get('conferences');
    return myKeyNotes.filterBy('keyNote', programmerName);
  }),
  conferenceNames: Ember.computed('conferences', function(){
    var confNames = this.get('conferences').map(function(conf, index){
      return conf.name;
    })
    return confNames;
  }),
  conferenceTotal: Ember.computed('conferences', function(){
    return this.conferences.length;
  }),
  itinerary: Ember.computed('conferences', function(){
    var num = this.conferences.length;
    var statement = `${this.nickName} is speaking at ${num} conferences`
    return statement;
  }),
  hasValidEmail: Ember.computed('email', function(){
    var email = this.get('email')
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }),
  isInvalid: Ember.computed('errors', function(){
    if (this.get('errors').length > 0 ){
      return true;
    } else {
      return false;
    }
  }), 
  errors: Ember.computed('firstName', 'lastName', 'age', 'email', function(){
    var err = []
    if (this.get('firstName') === null){
      err.pushObject('firstName cannot be blank');
    } 
    if (this.get('lastName') === null){
      err.pushObject('lastName cannot be blank');
    } 
    if (this.get('age') === null){
      err.pushObject('age cannot be blank');
    } 
    if (this.get('email') === null) {
      err.pushObject('email must be valid');
    }
    return err;
  }),
  hasErrors: Ember.computed('errors', function(){
    if (this.get('errors').length > 0 ){
      return true;
    } else {
      return false;
    }
  }),
  isValid: Ember.computed('errors', function(){
    if (this.get('errors').length === 0){
      return true;
    } else {
      return false;
    }
  })
});


