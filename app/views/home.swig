{% extends 'layout.swig' %}

{% block content %}

<!-- Following Menu -->
<div class="ui large top fixed hidden menu">
  <div class="ui container">
  <a href="#top" class="item">HLG</a>
  <a href="#available-now" class="item">Available Now</a>
  <a href="#available-next-week" class="item">Next Week</a>
  <a href="#full-list" class="item">Our Full List</a>
    <div class="right menu">
      <div class="item">
        <a class="ui primary button">Log in</a>
      </div>
    </div>
  </div>
</div>

<!-- Sidebar Menu -->
<div class="ui vertical inverted sidebar menu">
  <a href="#top" class="item">HLG</a>
  <a href="#available-now" class="item">Available Now</a>
  <a href="#available-next-week" class="item">Next Week</a>
  <a href="#full-list" class="item">Our Full List</a>
  <a class="item">Login</a>
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
            <div class="right item">
              <a class="ui inverted basic button">Log in</a>
            </div>
        </div>
      </div>

     <div class="ui text container">
       <h1 class="ui inverted header">
         Harvest Lane Gardens
       </h1>
       <h2>Providing direct access to local, small batch farms.</h2>
       <a href="#available-now" class="ui huge inverted basic button">
         Available Now
       </a>
     </div>
   </div>

   <!-- Vertical stripe segments -->
        
   <div class="ui vertical stripe segment">
     <div class="ui middle aligned stackable grid container">
       <div class="row">
         <div class="eight wide column">
           <h3 class="ui header">Produce from a garden near you</h3>
           <p>We grow and harvest our produce just outside Iowa City, without the use of chemicals or pesticides. By eating locally grown produce, you're investing in eating the way nature intended. We don't stress water supplies in parched parts of the country, and we don't waste fuel getting it to you.</p>
           <h3 class="ui header">We Make </h3>
           <p>Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.</p>
         </div>
         <div class="six wide right floated column">
           <img src="../images/thistle.JPG" class="ui large bordered rounded image">
         </div>
       </div>
     </div>
   </div>
    
   <h4 class="ui horizontal header divider">Available Now</h4>
   <div class="ui vertical stripe segment" id="available-now">
     <div class="ui three column center aligned divided relaxed stackable grid container">
       <div class="row">
         <div class="column">
           <h2 class="ui icon header">
             <img class="ui icon image" src="/images/icons/paint.png">
             Veg 1
           </h2>
           <p>veg1</p>
           <a class="ui large button" href="/usage/theming.html">veg 1</a>
         </div>
         <div class="column">
           <h2 class="ui icon header">
             <img class="ui icon image" src="/images/icons/book.png">
             Veg 2
           </h2>
           <p>veg2</p>
           <div class="ui view-ui large button">veg 2
           </div>
         </div>
         <div class="column">
           <h2 class="ui icon header">
             <img class="ui icon image" src="/images/icons/lab.png">
             Veg 3
           </h2>
           <p>
             veg3
           </p>
           <a href="/" class="ui large button">Veg3 </a>
         </div>
         <div class="column">
           <h2 class="ui icon header">
             <img class="ui icon image" src="/images/icons/lab.png">
             Veg 4
           </h2>
           <p>
             veg4
           </p>
           <a href="/" class="ui large button">Veg4 </a>
         </div>
         <div class="column">
           <h2 class="ui icon header">
             <img class="ui icon image" src="/images/icons/lab.png">
             Veg 5
           </h2>
           <p>
             veg5
           </p>
           <a href="/" class="ui large button">Veg5 </a>
         </div>
       </div>
    </div>
  </div>

  <h4 class="ui horizontal header divider">Next Week</h4>
  <div class="ui vertical stripe quote segment" id="available-next-week">
    <div class="ui center aligned grid container">
      <div class="column">
        <p>Weather and other conditions permitting, we expect to have the following items available next week.</p>
      </div>
    </div>

    <div class="ui equal width stackable internally celled grid">
      <div class="center aligned row">
        <div class="column">
          <h3>Veggies</h3>
          <ul>
              <li>Baby Bok Choy</li>
              <li>Beets</li>
              <li>Zuchini</li>
          </ul>
        </div>
        <div class="column">
          <h3>Herbs</h3>
          <ul>
              <li>Basil</li>
              <li>Thyme</li>
              <li>Marjoram</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="ui vertical stripe segment" id="full-list">
    <div class="ui text container">
      <h3 class="ui header">Our Full List</h3>
      <p>Here's the complete list of produce we grow at Harvest Lane Gardens.</p>
      <h4 class="ui horizontal header divider">HLG</h4>
      <p>The complete list.</p>
      <a class="ui large button">Let us know if you're interested</a>
    </div>
  </div>

    
{% endblock %}