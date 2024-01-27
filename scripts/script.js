$(window).on('load', function () {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    navText: [
      "<img src='/images/arrow-prev.png' alt='Arrow'>",
      "<img src='/images/arrow-next.png' alt='Arrow'>",
    ],
    dots: true,
    items: 3,
    responsive: {
      0: {
        items: 1,
        dotsEach: 3,
      },
      1024: {
        items: 2,
      },
      1230: {
        items: 3,
      },
    },
  });

  $('.open-image-link').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: true,
  });

  new WOW({
    animateClass: 'animate__animated',
  }).init();

  // Открытие и закрытие burger-меню

  let menu = $('#menu');
  $('#burger').on('click', () => {
    menu.addClass('open');
  });

  $('.menu-item').on('click', closeMenu);
  $('.close').on('click', closeMenu);

  function closeMenu() {
    menu.removeClass('open');
  }

  // Попап заказа звонка

  // Открытие и закрытие

  let callMe = $('.popup-callme');

  function openCallmePopup() {
    callMe.addClass('active');
  }

  function closeCallmePopup() {
    callMe.removeClass('active');
    $('.callme-input-error').removeClass('error-input-span');
    $('.callme-input').removeClass('error-input-border');
  }

  $('.header-button, .footer-button, .header-action-phone').on('click', () => {
    openCallmePopup();
  });

  $('.callme-quit').on('click', () => {
    closeCallmePopup();
    clearCallmeFields();
  });

  $(document).on('click', function (e) {
    if (callMe.is(e.target)) {
      thankyou.hide();
      call.show();
      closeCallmePopup();
      clearCallmeFields();
    }
  });

  // Проверка заполненности полей для ввода телефона

  let name = $('#callme-name');
  let phone = $('#callme-phone');
  let loader = $('.loader');
  let call = $('.callme-order');
  let thankyou = $('.callme-thankyou');

  function clearCallmeFields() {
    name.val('');
    phone.val('');
  }

  // Если при нажатии на кнопку не заполнены все поля,
  $('#callme-submit').on('click', () => {
    // то появляются предупредительные надписи и красная рамка для всех полей.
    if (!name.val() && !phone.val()) {
      $('.callme-input-error').addClass('error-input-span');
      $('.callme-input').addClass('error-input-border');
    } else {
      // В противном случае проверяем каждое поле на заполненность по отдельности,
      // но сначала скрываем подписи и возвращаем рамкам первоначальный цвет.
      $('.callme-input-error').removeClass('error-input-span');
      $('.callme-input').removeClass('error-input-border');

      // Потом выполняем проверку каждого поля на заполненность, но не прерываем
      // выполнение, а проверяем все поля последовательно.
      if (!name.val()) {
        $('#callme-name-error').addClass('error-input-span');
        $('#callme-name').addClass('error-input-border');
      }

      if (!phone.val()) {
        $('#callme-phone-error').addClass('error-input-span');
        $('#callme-phone').addClass('error-input-border');
      }
    }
    // Проверяем, что все поля заполнены
    if (name.val() && phone.val()) {
      // Выполняем запрос на сервер для проверки имени
      sendRequest(name.val(), phone.val());
    }
  });

  // Функция для проверки на сервере по имени

  function sendRequest(name, phone) {
    loader.css('display', 'flex');
    $.ajax({
      method: 'POST',
      url: 'https://testologia.site/checkout',
      data: { name: name, phone: phone },
    }).done(function (message) {
      loader.hide();
      if (message && message.success === 1) {
        call.hide();
        thankyou.show();
      } else {
        alert('Извините, возникла ошибка. Проверьте данные и попробуйте еще раз.');
        clearCallmeFields();
      }
    });
  }

  // Закрытие сообщения с подтверждением заказа и очистка полей формы

  $('#thankyou').on('click', () => {
    thankyou.hide();
    call.show();
    clearCallmeFields();
    closeCallmePopup();
  });

  // Попап оформления заказа

  // Открытие попапа при нажатии кнопки "Оформить заказ"

  let order = $('.popup-order');

  function openOrderPopup() {
    order.addClass('active');
  }

  function closeOrderPopup() {
    order.removeClass('active');
    $('.order-input-error').removeClass('error-input-span');
    $('.order-input').removeClass('error-input-border');
    $('.order').css('display', 'grid');
    $('.order-thankyou').css('display', 'none');
  }

  $('.button-plants').on('click', () => {
    openOrderPopup();
  });

  $('.order-quit, .button-order-thankyou').on('click', () => {
    closeOrderPopup();
    clearOrderFields();
  });

  $(document).on('click', function (e) {
    if (order.is(e.target)) {
      closeOrderPopup();
      clearOrderFields();
    }
  });

  // Проверка заполненности полей для заказа

  let orderName = $('#order-name');
  let orderPhone = $('#order-phone');
  let orderDetails = $('#order-textarea');

  function clearOrderFields() {
    orderName.val('');
    orderPhone.val('');
    orderDetails.val('');
  }

  // Если при нажатии на кнопку не заполнены все поля,
  $('#order-submit').on('click', () => {
    // то появляются предупредительные надписи и красная рамка
    if (!orderName.val() && !orderPhone.val() && !orderDetails.val()) {
      $('.order-input-error').addClass('error-input-span');
      $('.order-input').addClass('error-input-border');
    } else {
      // В противном случае проверяем каждое поле на заполненность по отдельности,
      // но сначала скрываем подписи и возвращаем рамкам первоначальный цвет
      $('.order-input-error').removeClass('error-input-span');
      $('.order-input').removeClass('error-input-border');

      // Потом выполняем проверку каждого поля на заполненность, но не прерываем
      // выполнение, а проверяем все поля последовательно.
      if (!orderName.val()) {
        $('#order-name-error').addClass('error-input-span');
        $('#order-name').addClass('error-input-border');
      }

      if (!orderPhone.val()) {
        $('#order-phone-error').addClass('error-input-span');
        $('#order-phone').addClass('error-input-border');
      }

      if (!orderDetails.val()) {
        $('#order-textarea-error').addClass('error-input-span');
        $('#order-textarea').addClass('error-input-border');
      }
    }

    // Проверяем, что все поля заполнены
    if (orderName.val() && orderPhone.val() && orderDetails.val()) {
      // Выполняем запрос на сервер для проверки имени
      sendOrderRequest(orderName.val(), orderPhone.val(), orderDetails.val());
    }

    function sendOrderRequest(name, phone, details) {
      loader.css('display', 'flex');
      $.ajax({
        method: 'POST',
        url: 'https://testologia.site/checkout',
        data: { name: name, phone: phone, details: details },
      }).done(function (message) {
        loader.hide();
        if (message && message.success === 1) {
          $('.order').css('display', 'none');
          $('.order-thankyou').css('display', 'grid');
        } else {
          alert('Извините, возникла ошибка. Проверьте данные и попробуйте еще раз.');
          clearOrderFields();
        }
      });
    }
  });

  // Закрываем все попапы по клавише Escape

  $(document).on('keyup', function (e) {
    if (e.key === 'Escape') {
      thankyou.hide();
      call.show();
      closeCallmePopup();
      closeOrderPopup();
      clearCallmeFields();
      clearOrderFields();
    }
  });

  // Смена категорий товаров

  let category1 = $('.menu-item-1-products');
  let category2 = $('.menu-item-2-products');
  let category1Menu = $('.plants-menu-item:first-child');
  let category2Menu = $('.plants-menu-item:last-child');

  category1Menu.has('a').on('click', () => {
    category2.removeClass('show');
    category1.addClass('show');
    category2Menu.removeClass('underline');
    category1Menu.addClass('underline');
  });

  category2Menu.has('a').on('click', () => {
    category1.removeClass('show');
    category2.addClass('show');
    category1Menu.removeClass('underline');
    category2Menu.addClass('underline');
  });
});
