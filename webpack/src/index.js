import $ from 'jquery'
import './css/1.css'
$(function(){
    $('li:odd').css('backgroundColor','green')
    $('li:even').css('backgroundColor','yellow')
})