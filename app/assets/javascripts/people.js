// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// var currentPerson = {};
// var showForm2 = false;
var editingPerson;
//
//
//   function getPerson(data-person-id) {
//     $.ajax({
//       url: '/career/' + id,
//       type: 'GET'
//     }).done( function(career) {
//       if (editingCareer) {
//         var li = $("[data-id='" + id + "'").parents('li');
//         $(li).replaceWith(career);
//         editingCareer = null;
//       } else {
//         $('#career-list').append(career);
//       }
//     });
//   }
//
//   function toggle() {
//     showForm = !showForm;
//     $('#person-form').remove();
//     $('#people').toggle();
//
//     if (showForm) {
//       let data = {};
//       if (editingPerson)
//         data.id = editingPerson;
//       $.ajax({
//         url: "/people_form2",
//         type: 'GET',
//         data: data
//       }).done( function(html) {
//         $('#career').after(html);
//       });
//     }
//   }
var editingPerson;
var editingJob;

$(document).ready( function() {
//
  $(document).on('click', '#edit-person', function() {
    editingJob = $(this).parent('.peep').data().id;
    editingPerson = $(this).parent('.peep').data().personId;
    let data = {};
    data.id = editingPerson;
    data.career_id = editingJob;
    $('#people').css("display", "none");
    $.ajax({
      url: "/person_form",
      type: 'GET',
      data: data
    }).done( function(html) {
      $('#career').after(html);
    });

    $(document).on('submit', '#person-form form', function(e) {
      e.preventDefault();
      var params = $(this).serializeArray();
      var url = '/careers/' + editingJob + '/people' + '/' + editingPerson;
      var method = 'PUT';
      $.ajax({
        url: url,
        type: method,
        data: params
      }).done( function(game) {
        $('#people').css("display", "");
      }).fail( function(err) {
        alert(err.responseJSON.errors);
      });
    });

    $(document).on('click', '#delete-person', function() {
      var career_id = $(this).parent('.peep').data().id;
      var id = $(this).parent('.peep').data().personId;
      debugger
      $.ajax({
        url: '/careers/' + career_id + '/people' + id,
        type: 'DELETE'
      }).done( function() {
        var row = $("[data-id='" + career_id + "'");
        row.remove();
      });
    });

  });
//
//   $(document).on('click', '#delete-career', function() {
//     var id = $(this).siblings('.career-item').data().id;
//     $.ajax({
//       url: '/careers/' + id,
//       type: 'DELETE'
//     }).done( function() {
//       var row = $("[data-id='" + id + "'").parents('li');
//       row.remove();
//     });
//   });
});
