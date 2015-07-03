{% extends 'layout.swig' %}

{% block content %}

    <div class="main-login-page">
      <section class="login-page">
        <h2 id="manage-inventory">Manage Inventory</h2>

        <ul class="login-tabs primary">
	  <li class="login-tabs__tab is-active">
	    <a href="hg_login.html" class="login-tabs__tab-link is-active active">Log in <span class="element-invisible">(active tab)</span></a>
	  </li>
	  <li class="login-tabs__tab">
	    <a href="password/hg_new_pwd.html" class="pwd-tabs__tab-link">Request new password</a>
	  </li>
        </ul>
      </section>


      <form action="/user" method="post" id="user-login" accept-charset="UTF-8">
 
        <div class="form-item form-type-textfield form-item-name"> 
          <label for="edit-name">Username <span class="form-required" title="This field is required.">*</span></label> 
          <input type="text" id="edit-name" name="name" value="" size="60" maxlength="60" class="form-text required" />
          <div class="description">Enter username.</div>
        </div>

        <div class="form-item form-type-password form-item-pass"> 
          <label for="edit-pass">Password <span class="form-required" title="This field is required.">*</span></label> 
          <input type="password" id="edit-pass" name="pwd" size="60" maxlength="128" class="form-text required" />
          <div class="description">Enter your password.</div>
        </div>

        <div class="form-actions" id="edit-actions">
          <input type="submit" id="edit-submit" value="Log in" />
        </div>
      </form>
    </div>

{% endblock %}