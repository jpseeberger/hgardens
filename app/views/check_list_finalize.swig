<!DOCTYPE html>
<html>
<head>
  <!-- Standard Meta -->
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta http-equiv="content-language" content="en">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

  <title>Harvest Lane Gardens Check Out List</title>
    
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="/semantic.min.css">
  <link rel="stylesheet" type="text/css" href="/css/inventory.css" media="screen">
</head>
<body>
<br /><br />
    <h3 class="ui horizontal header divider">
      <a href="/" class="item">Return to Home Page</a>
    </h3>

    <div class="ui vertical stripe segment">
      <div class="ui column divided relaxed stackable grid container">
        <div class="row">


          <div class="sixteen wide column">
            <h2 class="ui icon header" id="check-list">
              Harvest Lane Gardens Check Out List
            </h2> <br />
            <h2>Our website is still evolving.</h2>
            <p> This is our first week of distribution.  
            Please either copy and clip the information below into an email to Roxane, or attach a screenshot of the page in your email to Roxane.</p>
            <p>Your email with the information included on this page will identify the order you will receive at the next pick-up.  Roxane will include payment information in your confirmation email of this order. 
            </p> 
            <p>WE WILL NOT SHARE YOUR EMAIL WITH ANYONE. WE RESPECT YOUR PRIVACY</p>            
            <br />
            
            <h2>Please include all of the information below this line in your email to Roxane.</h2>
            <p>--------------------------------------------------------------------------------------</p>
            <h2>Your Order</h2>

            {% for pc in displayOrder %}
              {% for item in inventory %}
                {% if loop.first %}
                  <h2 class="ui icon header"  id="{{pc.name}}">
                    {{(pc.name).toLowerCase().capitalize()}}  
                  </h2>
                  <ul>
                {% endif %}
                {% if item.parent_id == pc.id %}

                  <li class="produceitem" id="check-list-items">
                    <div class="ui grid">
                      <div class="sixteen wide column">
                        <p>
                        {% for classification in classifications %}
                          {% if item.classification_id == classification.id %}
                            {% for parent in classifications %}
                              {% if (classification.parent_id == parent.id) && parent.parent_id %}
                                {{(parent.name).toLowerCase().capitalize()}}, 
                              {% endif %}
                            {% endfor %}
                          {% endif %}
                        {% endfor %}
                        {{(item.name).toLowerCase().capitalize()}}:  
                        ${{(item.price/100).toFixed(2)}}    per: {{item.unit}}     
                        <span>
                        &ensp; &ensp;
                        </span>
                        
                        {% for si in selectedQuantities %}
                          {% if si.classification_id == item.classification_id %}
      Quantity: {{si.quantity}} x ${{(item.price/100).toFixed(2)}} = ${{(si.totalPrice/100).toFixed(2)}}

                          {% endif %}
                        {% endfor %}

                        </p>
                      </div>
                    </div>
                  </li>
                  
                  
                {% endif %}
                {% if loop.last %} <br /></ul>{% endif %}
              {% endfor %}
            {% endfor %}
            &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<h3>  Order total: ${{(totalInvoice/100).toFixed(2)}}</h3>
            <br />
            <br />
            <p>--------------------------------------------------------------------------------------</p>
            <h2>Include all of the information above this line in your email to Roxane.</h2>
          </div>
        </div>
      </div>
    </div>




    <h3 class="ui horizontal header divider">
      <a href="/" class="item">Return to Home Page</a>
    </h3>
<br /><br />    
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="/semantic.min.js"></script>
<script src="/js/inventory.js"></script>
</body>
</html>
