{% extends 'layout.swig' %}

{% block content %}


<br /><br />
    <h3 class="ui horizontal header divider">
      <a href="/" class="item">Return to Home Page</a>
    </h3>
    <div class="ui vertical stripe segment">
      <div class="ui column divided grid container">
  <form class="ui form" method="post" action="/check_list_finalize">
    <div class="fields">
        <div class="row">


          <div class="tweleve wide column">
            <h2 class="ui icon header" id="whoWeAre">
              Harvest Lane Gardens Order Form
            </h2> 
            <p>Select the number of each item you would like to order.  When you are finished, click the big, blue button to check your order total (there is also a button at the bottom of the page for your convenience).</p>
            <br />
    <button type="submit" class="ui huge inverted blue button">Check Your Order Total</button>
            <br />
            {% for id in grower_msgs %}
              <h4 class="ui blue header">
                {{id.name}}
              </h4>
            {% endfor %}
            <br />
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
                      <div class="seven wide column">
                        {% for classification in classifications %}
                          {% if item.classification_id == classification.id %}
                            {% for parent in classifications %}
                              {% if (classification.parent_id == parent.id) && parent.parent_id %}
                                {{(parent.name).toLowerCase().capitalize()}}, 
                              {% endif %}
                            {% endfor %}
                          {% endif %}
                        {% endfor %}
        <select name="classification_id">
          <option value="{{item.classification_id}}">
                        {{(item.name).toLowerCase().capitalize()}}
          </option>
        </select>
                        <h4>Available Units: {{item.unitsavailable}} </h4>
                        <h4>${{(item.price/100).toFixed(2)}} per {{(item.unit).toLowerCase().capitalize()}}</h4>
                      </div>
                      <div class="six wide column">
                        <select name="quantity">
                          {% for qu in quantity %}
                            <option value="{{qu.id}}" >
                              {{qu.name}}
                        Total: ${{(parseInt(qu.name,10)*item.price/100).toFixed(2)}}
                            </option>
                          {% endfor %}
                        </select>
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
    <button type="submit" class="ui huge inverted blue button">Check Your Order Total</button>
  </form>
          </div>
        </div>


    <h3 class="ui horizontal header divider">
      <a href="/" class="item">Return to Home Page</a>
    </h3>
<br /><br />    
{% endblock %}