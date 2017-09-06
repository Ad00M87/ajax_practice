// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var currentCareer = {};
var showForm = false;
var editingCareer;

$(document).ready( function() {

  function getCareer(id) {
    $.ajax({
      url: '/career/' + id,
      type: 'GET'
    }).done( function(career) {
      if (editingCareer) {
        var li = $("[data-id='" + id + "'").parents('li');
        $(li).replaceWith(career);
        editingCareer = null;
      } else {
        $('#career-list').append(career);
      }
    });
  }

  function toggle() {
    showForm = !showForm;
    $('#career-form').remove();
    $('#career-list').toggle();

    if (showForm) {
      let data = {};
      if (editingCareer)
        data.id = editingCareer;
      $.ajax({
        url: "/career_form",
        type: 'GET',
        data: data
      }).done( function(html) {
        $('#toggle').after(html);
      });
    }
  }

  $(document).on('click', '#edit-career', function() {
    editingCareer = $(this).siblings('.career-item').data().id;
    toggle();
  });

  $(document).on('click', '#delete-career', function() {
    var id = $(this).siblings('.career-item').data().id;
    $.ajax({
      url: '/careers/' + id,
      type: 'DELETE'
    }).done( function() {
      var row = $("[data-id='" + id + "'").parents('li');
      row.remove();
    });
  });

  $(document).on('submit', '#career-form form', function(e) {
    e.preventDefault();
    var params = $(this).serializeArray();
    var url = '/careers';
    var method = 'POST';

    if (editingCareer) {
      url = url + '/' + editingCareer;
      method = 'PUT';
    }

    $.ajax({
      url: url,
      type: method,
      data: params
    }).done( function(game) {
      toggle();
      getCareer(career.id);
    }).fail( function(err) {
      alert(err.responseJSON.errors);
    });
  });

  $('#toggle').on('click', function() {
    toggle();
  });

  $(document).on('click', '.career-item', function() {
    currentCareer.id = this.dataset.id;
    currentCareer.name = this.dataset.name;
    $.ajax({
      url: '/careers/' + currentCareer.id + '/people',
      type: 'GET'
    }).done( function(people) {
      $('#career').text('People in ' + currentCareer.name);
      var list = $('#people');
      list.empty();
      people.forEach( function(peep) {
        var li = '<li data-person-id="' + peep.id + '">' + '<div class="person-item">' + peep.name + ' - ' + peep.age + '</div>' +
        '<button class="btn" id="edit-person">' + 'Edit' + '</button>' +
        '<button class="btn" id="delete-person">' + 'Delete' + '</button>' + '</li>';
        list.append(li);
      });
    });
  });

});
