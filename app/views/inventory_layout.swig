<!DOCTYPE html>
<html>
<head>
  <!-- Standard Meta -->
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta http-equiv="content-language" content="en">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

  <title>{{ title }}</title>
    
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="/semantic.min.css">
  <link rel="stylesheet" type="text/css" href="/css/inventory.css" media="screen">
</head>
<body>
  <div class="ui large top fixed hidden menu">
    <div class="ui container">
      <div class="center aligned column">
        <div class="eight wide field">
          <a href="/inventory">Inventory Page</a>
        </div>
        <div class="eight wide field">
          <a href="/classifications">Classifications Page</a>
        </div>
      </div>
    </div>
  </div>


    {% block content %}{% endblock %}


    
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="/semantic.min.js"></script>
<script src="/js/inventory.js"></script>
</body>
</html>
