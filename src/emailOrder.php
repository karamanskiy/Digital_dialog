<?php

if (!empty($_POST)) {

	$to = "karamanskyi@gmail.com";

	$name = htmlspecialchars($_POST['name']);
	$tel = htmlspecialchars($_POST['tel']);
	$mes = htmlspecialchars($_POST['mes']);
	$type = htmlspecialchars($_POST['type']);


	$subject = 'Новая заявка с сайта - Number One';

	/* сообщение */
	$message = '
	<html>
	<head>
	<title>Новая заявка с сайта - Number One</title>
	</head>
	<body>
	<p><b>Имя:</b> ' . $name . '</p>
	<p><b>Телефон:</b> ' . $phone . '</p>
	<p><b>Тип услуги:</b> ' . $type . '</p>
	<p><b>Сообщение:</b> ' . $mes . '</p>
	<br/></body>
	</html>
	';

	$headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
	$headers .= "From: Отправитель <admin@mail.ru>\r\n"; //Наименование и почта отправителя
	mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail

}

?>