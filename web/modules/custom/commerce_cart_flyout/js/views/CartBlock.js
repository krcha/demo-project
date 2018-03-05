/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Backbone, Drupal) {
  Drupal.cartFlyout.CartBlockView = Backbone.View.extend({
    initialize: function initialize() {
      this.listenTo(this.model, 'cartsLoaded', this.render);
    },

    events: {
      'click .cart-block--link__expand': 'offcanvasOpen'
    },
    offcanvasOpen: function offcanvasOpen(event) {
      event.preventDefault();
      Drupal.cartFlyout.flyoutOffcanvasToggle();
    },
    render: function render() {
      var template = Drupal.cartFlyout.getTemplate({
        id: 'commerce_cart_js_block',
        data: '<div class="cart--cart-block">\n' + '  <div class="cart-block--summary">\n' + '    <a class="cart-block--link__expand" href="<%= url %>">\n' + '      <span class="cart-block--summary__icon" />\n' + '      <span class="cart-block--summary__count"><%= count_text %></span>\n' + '    </a>\n' + '  </div>\n' + '</div>\n'
      });
      this.$el.html(template.render({
        url: this.model.getUrl(),
        count_text: Drupal.formatPlural(this.model.getCount(), this.model.getCountSingular(), this.model.getCountPlural())
      }));
      var icon = new Drupal.cartFlyout.CartIconView({
        el: this.$el.find('.cart-block--summary__icon'),
        model: this.model
      });
      icon.render();

      Drupal.attachBehaviors();
    }
  });
  Drupal.cartFlyout.CartIconView = Backbone.View.extend({
    initialize: function initialize() {},
    render: function render() {

      var template = Drupal.cartFlyout.getTemplate({
        id: 'commerce_cart_js_block_icon',
        data: '<img src="<%= icon %>" alt="Cart"/>'
      });
      this.$el.html(template.render({
        icon: this.model.getIcon()
      }));
    }
  });
})(Backbone, Drupal);