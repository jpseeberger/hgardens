{% extends 'layout.swig' %}

{% block content %}


    <div class="main-login-page">
      <section class="login-page">
        <h2 id="manage-inventory">Manage Inventory</h2>

        <ul class="login-tabs primary">
	  <li class="login-tabs__tab is-active">
	    <a href="/login" class="login-tabs__tab-link">Log in </a>
	  </li>
	  <li class="login-tabs__tab">
	    <a href="login/password" class="login-tabs__tab-link is-active active">Request new password<span class="element-invisible">(active tab)</span></a>
	  </li>
        </ul>
      </section>

      <form action="/user/password" method="post" id="user-pass" accept-charset="UTF-8">
 
        <div class="form-item form-type-textfield form-item-name"> 
          <label for="edit-name">Username or e-mail address <span class="form-required" title="This field is required.">*</span></label> 
          <input type="text" name="pwd"/>
        </div>

	<div class="form-actions form-wrapper" id="edit-actions">
	  <input type="submit" name="Go" value="E-mail new password" />
	</div>
      </form>
    </div>


{% endblock %}