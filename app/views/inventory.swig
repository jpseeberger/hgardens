
<!DOCTYPE html>
<html>
<head>
  <!-- Standard Meta -->
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

  <title>Homepage - Harvest Lane Gardens</title>
    
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="/semantic.min.css">
  <link rel="stylesheet" type="text/css" href="/css/inventory.css" media="screen">
</head>
<body>

<div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui teal header">
      <div class="content">
        Inventory Control
      </div>
    </h2>
    <h4 class="ui dividing header">Current Inventory</h4>
    <table class="ui compact celled definition table" id="indexedTable">
      <thead>
        <tr>
          <th></th>
          <th>Class</th>
          <th>Category</th>
          <th>Subcategory</th>
          <th>Price</th>
          <th>Unit</th>
          <th>Available</th>
          <th>Grower</th>
          <th>Photo</th>
        </tr>
      </thead>
      <tbody>
        {% for y in arr %}
          {% for x in  y %}
            {% if loop.first %}
              <tr>
              <td>
                <div class="ui radio checkbox">
                <input type="checkbox"> <label></label>
                </div>
              </td>
            {% endif %}
            <td>{{ x }}</td>
          {% if loop.last %}</tr>{% endif %}
        {% endfor %}
      {% endfor %}
      </tbody>
      <tfoot class="full-width">
        <tr>
          <th></th>
          <th colspan="8">
          <form method="get" action="/inventory/new">
            <button type="submit" class="ui right floated small primary labeled button">
              Add New Item
            </button>
</form>
            <div class="ui small button">
              Edit Selected Item
            </div>
            <div class="ui small button">
              Delete Selected Item
            </div>
          </th>
        </tr>
      </tfoot>
    </table>
    <script>console.log('myRowIndex', myRowIndex);</script>

{% block content %}{% endblock %}

</div>
</div>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="/semantic.min.js"></script>
<script src="/js/sort_function.js"></script>
<script src="/js/inventory.js"></script>
</body>
</html>

