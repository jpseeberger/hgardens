{% extends 'layout.swig' %}

{% block content %}

<!-- Following Menu -->
<div class="ui large top fixed hidden menu">
  <div class="ui container">
  <a href="#top" class="item">HLG</a>
  <a href="#available-now" class="item">Available Now</a>
  <a href="#available-next-week" class="item">Next Week</a>
  <a href="#full-list" class="item">Our Full List</a>
<!--    <div class="right menu">
      <div class="item">
        <a class="ui primary button">Log in</a>
      </div>
    </div> 
-->
  </div>
</div>

<!-- Sidebar Menu -->
<div class="ui vertical inverted sidebar menu">
  <a href="#top" class="item">HLG</a>
  <a href="#available-now" class="item">Available Now</a>
  <a href="#available-next-week" class="item">Next Week</a>
  <a href="#full-list" class="item">Our Full List</a>
<!--    <a class="item">Login</a>
-->
</div>

<!-- Page Contents -->
<div id="top" class="pusher">
  <div class="full height">

    <div class="ui inverted vertical masthead center aligned segment">
      <div class="ui container">
        <div class="ui large secondary inverted pointing menu">
            <a class="toc item">
              <i class="sidebar icon"></i>
            </a>
            <a href="#top" class="item"><i class="fa fa-leaf"> HLG</i></a>
            <a href="#available-now" class="item">Available Now</a>
            <a href="#available-next-week" class="item">Next Week</a>
            <a href="#full-list" class="item">Our Full List</a>
<!--                <div class="right item">
              <a class="ui inverted basic button">Log in</a>
            </div>
-->
        </div>
      </div>

      <div class="ui text container">
        <h1 class="ui inverted header">
          Harvest Lane Gardens
        </h1>
        <h2>Providing direct access to <br/>your neighborhood, small batch farms</h2>
        <a href="#available-now" class="ui huge inverted basic button">
          Produce Available Now
        </a>
      </div>
    </div>

    <!-- Vertical stripe segments -->
        
    <div class="ui vertical stripe segment">
      <div class="ui middle aligned stackable grid container">
        <div class="row">
          <div class="eight wide column">
            <h3 class="ui header">Who We Are... </h3>
              <p>Roxane, Loren and Joanne, and Jon are growers right here in Johnson County. They value ecologically sustainable growing practices.</p>
            <h3 class="ui header" id="weBelieve">We Believe...</h3>
              <p>...that the best “Fresh and Local” comes from close to home.</p>
              <p>Local rainfall and Iowa soil produce the freshest, tastiest vegetables and support nature's ecologically designed food-growing practices.</p>
              <p>If you don’t have time to grow your own veggies at home, your Harvest Lane Gardens neighbor is growing them for you right here in Iowa City!</p>
            <h3 class="ui header">How It Works... </h3>
              <p>To start getting the freshest produce available, see contact information below.</p>
          </div>
            <div class="six wide right floated column">
              <img src="../images/rox_np.jpg" class="ui medium bordered rounded image">
              <img src="../images/loren_joanne_np.jpg" class="ui medium bordered rounded image">
              <img src="../images/jon_fb.png" class="ui medium bordered rounded image">
            </div>
        </div>
      </div>
    </div>
    
    <h3 class="ui horizontal header divider">Available Now</h3>
    <div class="ui vertical stripe segment" id="available-now">
      <div class="ui column divided relaxed stackable grid container">
        <div class="row">

<!-- Start on the fly menu here -->
          <div class="four wide column" id="mobilemenu">
            <div class="overlay">
              <div class="ui vertical menu">
                <div id="productMenu">
                  <p>Available Now</p>
                  <ul>
                    {% for classification in parentClasses %}
                      <li>
                        <a href="#{{classification.name}}" class="small button">
                          <div class="ui label">{{(classification.name).toLowerCase().capitalize()}}
                          </div>
                        </a>
                      </li>
                    {% endfor %}
                  </ul>
                </div>
              </div>
            </div>
          </div>
<!-- End on the fly menu here -->

          <div class="eight wide column">
            <h2 class="ui icon header">
              What We're Bringing You This Week
            </h2> <br />
            {% for pc in displayOrder %}
              {% for item in inventory %}
                {% if loop.first %}
                  <h2 class="ui icon header"  id="{{pc.name}}">
                    {{(pc.name).toLowerCase().capitalize()}}  
                  </h2>
                  <ul>
                {% endif %}
                {% if item.parent_id == pc.id %}
                  <li class="produceitem">
                    <div class="ui grid">
                      <div class="three wide column">
                        {% for classification in classifications %}
                          {% if item.classification_id == classification.id %}
                             {% for cps in class_photos %}
                              {% if cps.cid == item.classification_id %}
                                <img class="image" src="/images/{{cps.photo_name}}" height="60" width="80">
                              {% endif %}
                            {% endfor %}
                          {% endif %}
                        {% endfor %}
                      </div>
                      <div class="eight wide column">
                        {% for classification in classifications %}
                          {% if item.classification_id == classification.id %}
                            {% for parent in classifications %}
                              {% if (classification.parent_id == parent.id) && parent.parent_id %}
                                {{(parent.name).toLowerCase().capitalize()}}, 
                              {% endif %}
                            {% endfor %}
                          {% endif %}
                        {% endfor %}
                        {{(item.name).toLowerCase().capitalize()}}
                        <h4>Available Units: {{item.unitsavailable}} </h4>
                        <h4>Unit:  {{item.unit}}  Price: ${{(item.price/100).toFixed(2)}} </h4>
                      </div>
                      <div class="five wide column">
                      </div>
                    </div>
                  </li>
                {% endif %}
                {% if loop.last %}</ul>{% endif %}
              {% endfor %}
            {% endfor %}
          </div>
          <div class="four wide column">
          </div>
        </div>
      </div>
    </div>

    <div class="ui vertical stripe segment" id="available-next-week">
      <div class="ui center aligned grid container">
        <div class="column">
          <div class="ui header">Next Week</div>
          <p>Weather permitting, here's what we expect to have next week.</p>
        </div>
      </div>

      <div class="ui equal width stackable internally celled grid">
        <div class="row">
          <div class="four wide column">
          </div>
          <div class="eight wide column">
          
            {% for pc in parentClassesNextWeek %}
              {% for item in nextWeek %}
                {% if loop.first %}
                  <h4 class="ui icon header">
                    {{(pc.name).toLowerCase().capitalize()}}  
                  </h4>
                  <ul>
                {% endif %}
                {% if (item.parent_id == pc.id) %}
                  <li class="produceitemfuture">
                    {% for classification in classifications %}
                      {% if item.classification_id == classification.id %}
                        {% for parent in classifications %}
                          {% if (classification.parent_id == parent.id) && parent.parent_id %}
                            {{(parent.name).toLowerCase().capitalize()}}, 
                          {% endif %}
                        {% endfor %}
                      {% endif %}
                    {% endfor %}
                    {{(item.name).toLowerCase().capitalize()}}
                  </li>
                {% endif %}
                {% if loop.last %}</ul>{% endif %}
              {% endfor %}
            {% endfor %}
            
          </div>
          <div class="four wide column">
          </div>
        </div>
      </div>
  </div>

  <div class="ui vertical stripe segment" id="full-list">
    <div class="ui center aligned grid container">
      <div class="column">
        <div class="ui header">Our Full List</div>
        <p>The complete list of produce we grow at Harvest Lane Gardens.</p>
      </div>
    </div>
      <div class="ui equal width stackable internally celled grid">
        <div class="row">
          <div class="four wide column">
          </div>
          <div class="eight wide column">
          
            {% for pc in parentClassesFullList %}
              {% for item in fullList %}
                {% if loop.first %}
                  <h4 class="ui icon header">
                    {{(pc.name).toLowerCase().capitalize()}}  
                  </h4>
                  <ul>
                {% endif %}
                {% if (item.parent_id == pc.id) %}
                  <li class="produceitemfuture">
                    {% for classification in classifications %}
                      {% if item.classification_id == classification.id %}
                        {% for parent in classifications %}
                          {% if (classification.parent_id == parent.id) && parent.parent_id %}
                          {{(parent.name).toLowerCase().capitalize()}}, 
                          {% endif %}
                        {% endfor %}
                      {% endif %}
                    {% endfor %}
                    {{(item.name).toLowerCase().capitalize()}}
                  </li>
                {% endif %}
                {% if loop.last %}</ul>{% endif %}
              {% endfor %}
            {% endfor %}
            
          </div>
          <div class="four wide column">
          </div>
        </div>
      </div>

</div>

  <h4 class="ui horizontal header divider">HLG</h4>
    
{% endblock %}