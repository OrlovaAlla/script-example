$(document).ready(function(){

  /*--Array students -- */
  var students = [];


    /*--Add student --*/  
     $('html').on('click', '.form_submit',function(){
        
        let form_lastname = $('#form_lastname').val().trim();
        let form_name = $('#form_name').val().trim();
        let form_oth = $('#form_oth').val().trim();
        let form_born = $('#form_born').val().trim();
        let form_group = $('#form_group').val().trim();

        /*--Check of fields --*/

        if( form_lastname == ""){
            alert("Не заполнено: Фамилия");
            return false;
          } else if (form_name == ""){
            alert("Не заполнено: Имя");
            return false;
          } else if (form_oth == ""){
            alert("Не заполнено: Отчество ");
            return false;
          } else if(form_born == ""){
              alert("Неверно заполнено: Год рождения");
              return false;
          } else if (form_group == ""){
              alert("Не заполнено: Класс");
              return false;
          }
           
          /*--Create html-element --*/
   
         $('.tbody').append('<tr class="new_student" src_born="' + form_born +'" src_ln="'+ form_lastname +'"><td>' + form_lastname + '</td><td>' + form_name + '</td><td>' + form_oth + '</td><td>' + form_born + '</td><td>' + form_group + '</td><td class="delete_student" >&times</td></tr>');

         /*--Add student in array-- */

         students.push({
          'form_lastname': form_lastname, 
          'form_name': form_name, 
          'form_oth': form_oth, 
          'orm_born': form_born, 
          'form_group': form_group});
            
         /*--Reset of form fields */
        document.getElementById('form_list').reset('#form_list');

     
     }); 

     /* --Sort -- */

     $('html').on('click', '.sort_asc_ln', function(){
      sortStudents('src_ln');
     });
     $('html').on('click', '.sort_desc_ln', function(){
      sortStudentsDesc('src_ln');
     });

     $('html').on('click', '.sort_asc_year', function(){
      sortStudents('src_born');
     });
     $('html').on('click', '.sort_desc_year', function(){
      sortStudentsDesc('src_born');
     });
     


     function sortStudents(sortType) {
       let tbody = document.querySelector('.tbody');
       for( let i = 0; i < tbody.children.length; i++){
         for (let j = i; j < tbody.children.length; j++){
           if(tbody.children[i].getAttribute(sortType) > tbody.children[j].getAttribute(sortType)){
             replacedNode = tbody.replaceChild(tbody.children[j], tbody.children[i]);
             insertAfter(replacedNode, tbody.children[i]);
           }
         }
       }
     }
     function sortStudentsDesc(sortType) {
      let tbody = document.querySelector('.tbody');
      for( let i = 0; i < tbody.children.length; i++){
        for (let j = i; j < tbody.children.length; j++){
          if(tbody.children[i].getAttribute(sortType) < tbody.children[j].getAttribute(sortType)){
            replacedNode = tbody.replaceChild(tbody.children[j], tbody.children[i]);
            insertAfter(replacedNode, tbody.children[i]);
          }
        }
      }
    }
     function insertAfter(elem, refElem){
       return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
     }

   

     /* -- Delete row -- */

    $('html').on('click', '.delete_student',function(){
      if(confirm("Подтвердите удаление") == true){
        $(this).closest('tr').remove();
      }
    });

   /* --Download of list -- */

   $('html').on('click', '.table_download', function(){

    if(students == 0){
      alert('Нет данных для отправки');
      return;
    }
    console.log(students);

    studentsJs = JSON.stringify({students});
   console.log(studentsJs);

   $.ajax({
      url: "put_json.php",
      method: "POST",
      data: {studentsJs},
      success: function(textStatus){
        alert('Данные сохранены' + textStatus);},
      error: function(textStatus){
        alert('Ошибка' + textStatus);
      },
    });
 

   });

  
});


