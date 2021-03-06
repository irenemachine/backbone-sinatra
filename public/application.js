var Message = Backbone.Model.extend({});

var MessageStore = Backbone.Collection.extend({
 model: Message,
   url: 'http://damp-beyond-3252.herokuapp.com/messages'
});

var messages = new MessageStore;

var MessageView = Backbone.View.extend({

  events: { "submit #chatForm" : "handleNewMessage" },

  handleNewMessage: function(data) {
    var inputField = $('input[name=newMessageString]');
    messages.create({content: inputField.val()});
    inputField.val('');
  },

  render: function() {
    var data = messages.at(0).get("models").map(function(message) { return message.content + '\n'});
    var result = data.reduce(function(memo,str) { return memo + str }, '');
    $("#chatHistory").text(result);
    return this;
  }

});

//submit -> handleNewMessage -> messages.create -> messages.add
messages.bind('add', function(message) {
  messages.fetch({success: function(){view.render();}});
});

var view = new MessageView({el: $('#chatArea')});

setInterval(function(){
  messages.fetch({success: function(){view.render();}});
},1000)
