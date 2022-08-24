let colors = ['#1D55A0', '#ED1B24', '#FF9F00',' #00A652', '#993300', '#663399', 'gray', 'pink' ]
function changeH1()
{
  var x = function(){
    let subjects = document.querySelectorAll(".cnt_stt")
    for(let s of subjects)
    {
      let idx = parseInt(Math.random()*colors.length);
      s.style.backgroundColor = colors[idx];
    }
  }
  setInterval(x,1000)
}
function timeTable()
{
    setInterval(function () {
      var c = document.getElementById("time_table");
      var d = new Date();
      c.innerText = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }, 1000); 
}

function changeImg()
{
  var temp = 1
  var a = function(){
  document.getElementById("pic_slider").src = `street${temp}.png`
  temp++;
  if(temp==4)
    temp=1;
  }
  setInterval(a,1000)
}

function checkString(obj)
{
  var flag=false
  for(var i=0;i<obj.length;i++)
  {
    if(obj[i]!=' ')
      flag = true
  }
  return flag
}


//b1: đã cho sẵn ul.tab a:first-child active để có background color màu đỏ
//b2: ẩn hết cái tab_content h1 trừ cái đầu
//=> hiện cái đầu tiên có thẻ a màu đỏ & h1 màu đỏ, những cái còn lại ẩn
//b3: khi click vào: 
$(document).ready(function(){
  $(".tab_content h1:not(:first-child)").hide() //lấy tab h1 còn lại ẩn hết
  $("ul.tab a").click(function(){
  event.preventDefault()
  $("ul.tab a").removeClass("active") //remove các thẻ a có class là active
  $(this).addClass("active")//thẻ a đang click thì thêm class active
  var tab = $(this).attr("href") // lấy attribute của cái ul.tab a đang click
  $(".tab_content h1").hide() // ẩn tất cả các thẻ h1
  $(tab).show() //hiện cái h1 đang click có href = id

})



$(".header ").on("click",".fa-circle-minus",function(){
  var i=$(this).attr("rel")
  event.preventDefault()
  $(`.content_table_${i}`).toggleClass("close")
})




$(".menu_header li a#forum_btn ").click(function()
{
  $("html,body").animate({
    scrollTop:1410
  },750)
})
$(".menu_header li a#branch_btn ").click(function()
{
  $("html,body").animate({
    scrollTop:4100
  },1200)
})



//Trượt web lên 
$("#scroll_tool").click(function(){
  $("html,body").animate({
    scrollTop:0
  },2000)
})

//chạy thống kê
var topTime = null;
var artTime = null;
var memTime = null;

var top = $("#topics")
var art = $("#articles")
var mem = $("#members")

$(window).scroll(function(){
  if($(this).scrollTop()>=2300)
  {
    if(topTime==null)
      topTime = start(top,500,50000,"top")
    if(artTime==null)
      artTime = start(art,10000,1000000,"art")
    if(memTime==null)
      memTime = start(mem,12000,1200000,"mem")
  }
  


function start(elm,step,max,type)//chạy cái thống kê
{
  var value = parseInt(elm.text())
  if(value<max)
  {
  return setInterval(function(){
    if(value<max)
    {
      value+=step;
      elm.text(value)
    }
    else
    {
      if(type === "top")
        clearInterval(topTime)
      if(type === "art")
        clearInterval(artTime)
      if(type === "mem")
        clearInterval(memTime)
      // console.log(Math.random())
    }
  },40);
  }
}})




$("#send").click(function(){
  if((checkString($("#full_name").val())===true)&&(checkString($("#text_writting").val())===true))
  {
  event.preventDefault()
  $(".modal").addClass("on")
 
  }
  else
    {
      $(".form_group #err_msg_3").addClass("open")
    }
})
$(".modal").click(function(){
  event.preventDefault()
  $(".modal").removeClass("on")

})
$(".modal_close").click(function(){
  event.preventDefault()
  $(".modal").removeClass("on")
})
var modalInput = document.querySelector("div.modal_container")
modalInput.onclick = function() // bấm vào modal container mà ko thoát khỏi modal box
{
    event.stopPropagation() //Tránh kế thừa
}


$(".intro_text:not(:first-child)").hide() 
$("a.fa-circle").click(function(){
  event.preventDefault()
  $("a.fa-circle").removeClass("active_color")
  $(this).addClass("active_color")
  $(".intro_text").hide()
  var tab1 = $(this).attr("href") 
  $(tab1).show()
})

var timKiem=["Hoat dong","Thao luan","Dao tao","Lap trinh","Thong tin"]
$("#search_btn").keyup(function()
{
  var txt = $(this).val()
  var h=''
  for(var c of timKiem)
  {
    if(c.toLowerCase().indexOf(txt)>=0)
    h+=`<li><a href="javascript:;">${c}</a></li>`
  }
    $("#search_result").html(h)
    if(checkString(txt)==false)
    {
      $("#search_result").hide()
    }
    else
    {
      $("#search_result").show()
    }
})

$("#add_btn").click(function(){
  let name = prompt("Nhập tên bài viết", "New Status");
    let cnt = prompt("Nhập nội dung bài viết","Hello World")
    if (checkString(name)==true&&checkString(cnt)==true) {
        let h =`
        <ul class="forum_status">
          <li>
            <ul class="forum header tab_4 cnt_stt">
                <li>${name} <i class="fa-solid fa-keyboard"></i></li>
                <p></p>
            </ul>
            <ul class="forum header tab_4">
                <p>${cnt}</p>
            </ul>
          </li>
        </ul>
      <div id="margin_item"></div>`
      $(".forum_status:last-child").before(h);
    }
    else
      alert("Chưa nhập nội dung bài viết !!!")
})
})

function onBlur()
{
  var a = document.querySelector("#full_name")
  var b = document.querySelector("#text_writting")
  a.onblur = function()
  {
    var aVal = a.value
    let hideShow = document.getElementById("err_msg_1")
    if(aVal==''||checkString(aVal)==false)
      {
        hideShow.classList.add("open")
        a.classList.add("boder_err")
      }
    else
      {
        hideShow.classList.remove("open")
        a.classList.remove("boder_err")
      }
  }
  b.onblur = function()
  {
    var bVal = b.value
    let hideShow1 = document.getElementById("err_msg_2")
    if(bVal==''||checkString(bVal)==false)
      {
        hideShow1.classList.add("open")
        b.classList.add("boder_err")
      }
    else
      {
        hideShow1.classList.remove("open")
        b.classList.remove("boder_err")
      }
  }
}
function scrollTool()
{
    window.onscroll = function()
    {
        console.info(document.documentElement.scrollTop)
        var header = document.getElementById("scroll_tool")
        if(document.documentElement.scrollTop>500||document.body.scrollTop>500)
        {
        header.style.backgroundColor ="rgba(84,255,159,0.5)"
        }
        else
        header.style.backgroundColor="#2dbf5b"
    }
}
