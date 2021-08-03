<?php
$students = json_decode($_POST['studentsJs'], false);

if(isset($students)){

$students = json_encode($students);
file_put_contents('students.json', $students);

} else {
    echo ('нет данных');
}


?>