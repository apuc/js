<?php
/**
 * Created by PhpStorm.
 * User: apuc0
 * Date: 05.09.2016
 * Time: 13:20
 */

//var_dump($_POST['login']);
if($_POST['login'] == 'admin'){
    echo json_encode(['status'=>1]);
}
else{
    echo json_encode(['status'=>0,'error_msg'=>'Неверный логин 444'], JSON_UNESCAPED_UNICODE);
}
