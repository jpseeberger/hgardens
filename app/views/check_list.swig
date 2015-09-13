{% extends 'inventory_layout.swig' %}

{% block content %}



<!-- Page Contents -->
<div id="top" class="pusher">
  <div class="full height">


    <!-- Vertical stripe segments -->
        
    
    <div class="ui vertical stripe segment" id="available-now">
      <div class="ui column divided relaxed stackable grid container">
        <div class="row">


          <div class="sixteen wide column">
            <h2 class="ui icon header" id="check-list">
              Harvest Lane Gardens Check List
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
                        Order quantity _____ x ${{(item.price/100).toFixed(2)}} = _______
                        </p>
                      </div>
                    </div>
                  </li>
                {% endif %}
                {% if loop.last %} <br /></ul>{% endif %}
              {% endfor %}
            {% endfor %}
            <br />Order total: ______
            
          </div>
        </div>
      </div>
    </div>


    
{% endblock %}