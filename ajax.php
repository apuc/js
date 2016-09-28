<?php
/**
 * Created by PhpStorm.
 * User: apuc0
 * Date: 05.09.2016
 * Time: 13:20
 */

//var_dump($_POST['login']);
if(count($_POST) > 1){
    $arr = [];
    if($_POST['login'] == 'admin'){
        $arr[] = ['status' => 1, 'item' => 'login'];
    }
    else {
        $arr[] = ['status' => 0, 'item' => 'login', 'error_msg' => 'Неверный логин'];
    }
    if($_POST['login1'] == 'admin1'){
        $arr[] = ['status' => 1, 'item' => 'login1'];
    }
    else {
        $arr[] = ['status' => 0, 'item' => 'login1', 'error_msg' => 'Неверный логин 1'];
    }
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
}
else {
    if($_POST['login'] == 'admin'){
        echo json_encode(['status'=>1]);
    }
    else{
        echo json_encode(['status'=>0,'error_msg'=>'Неверный логин 444'], JSON_UNESCAPED_UNICODE);
    }
}

