
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
        Inventory Entry and Update
      </div>
    </h2>
    <h4 class="ui dividing header">Current Inventory</h4>

    <div class="ui grid">
      <div class="eight column row">
        <div class="two wide column">Class</div>
        <div class="two wide column">Category</div>
        <div class="three wide column">Subcategory</div>
        <div class="two wide column">Price</div>
        <div class="two wide column">Unit</div>
        <div class="two wide column">Available</div>
        <div class="two wide column">Grower</div>
        <div class="one wide column">Photo</div>
      </div>
    </div>

    <form class="ui form">
      <div class="field">
        <div id="existingInventory"></div>
      </div>
      <button class="ui teal button" id="showForm">Add New Item</button>
      <form class="ui form">
        <div class="field">
          <div class="fields">
            <div id="newInventoryItem"></div>
          </div>
        </div>
      </form>

      <h4 class="ui dividing header">Submit Inventory Updates</h4>
      <div class="field">
        <div class="fields">
          <div class="four wide field">
            <div class="ui checkbox inline">
              <input type="checkbox" name="receipt" tabindex="0" class="hidden">
              <label>Send Copy of Update To:</label>
            </div>
          </div>
          <div class="twelve wide field">
            <input type="email" placeholder="roxane-mitten@uiowa.edu">
          </div>
        </div>
      </div>
      <div class="ui fluid large teal submit button">Submit Updates to Database</div>
    </form>
  </div>
</div>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="/semantic.min.js"></script>
<script src="/js/sort_function.js"></script>
<script src="/js/inventory.js"></script>
</body>
</html>

