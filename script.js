/*page 63-65*/
(function () {
    window.onload = function () {
        /*for first test*/
        var anwers, buttonStart, questions, i;
        var rez = {};
        var savingAnwers=[];
        var div1 = document.querySelector("#test1");
        var body = document.getElementsByTagName("body")[0];

        function clearBody(body) {
         /*clear body with animation*/
         //body.style.display="flex";
         //body.style.justifyContent="center";
        //body.style.alignItems="center";
        //body.style.alignContent="center";
            var int=Math.floor(Math.random()*3);
            switch (int){
                case 0:
                    $("div").fadeOut(1000).delay(1000).queue(function() { $(this).remove()});
                    break;
                case 1:
                    $("div").slideUp(1000).delay(1000).queue(function() { $(this).remove()});
                    break;
                case 2:
                   $("div").hide(1000).delay(1000).queue(function() { $(this).remove()});
                    break;
            }
            /*while (body.firstChild) {
                body.removeChild(body.firstChild);
            }*/
        }

        function getData(file) {
                var questionArr;
                /*get data from server using ajax*/            
                var xhr = new XMLHttpRequest();
                xhr.open("GET", file, false);
                //xhr.open("GET", file, true);
                //xhr.onreadystatechange = function () {
                //    if (xhr.readyState == 4) {
                //        if (xhr.status == 200) {
                //            questionArr = JSON.parse(xhr.responseText);
                //        }
                //    }
                //}
                xhr.send();
                return questionArr = JSON.parse(xhr.responseText);
            }
            
        /*function for creating div with question and radiobuttons*/
        var div, p, radio, label;
        function createDivWithQuestion(element,i) {
            div = document.createElement("div");
            div.className = "question";
            /*for adding animation*/
            div.style.display="none"
            body.appendChild(div);
            p = document.createElement("p");
            p.innerHTML = i+1 +". "+ element.question;
            div.appendChild(p);
            answers = element.answers;
            for (var key in answers) {
                if (answers.hasOwnProperty(key)) {
                    radio = document.createElement("input");
                    radio.setAttribute("type", "radio");
                    radio.setAttribute("name", "group");
                    radio.setAttribute("id", key);
                    radio.value = key;
                    div.appendChild(radio);
                    label = document.createElement("label");
                    label.innerHTML = key + ". " + answers[key] + "<br>";
                    label.setAttribute("for", key);
                    div.appendChild(label);
                }
            }
            var buttonBack = document.createElement("button");
            var buttonNext = document.createElement("button");
            buttonBack.innerHTML = "&larr; Back";
            buttonBack.setAttribute("id", "back");
            buttonNext.innerHTML = "Next &rarr;";
            buttonNext.setAttribute("id", "next");
            div.appendChild(buttonBack);
            div.appendChild(buttonNext);
            if (i == 0) {
                buttonBack.disabled=true;
            }
            buttonNext.disabled = true;
            /*add animation*/
             var int=Math.floor(Math.random()*3);
            switch (int){
                case 0:
                    $("div").fadeIn(1000);
                    break;
                case 1:
                    $("div").slideDown(1000);
                    break;
                case 2:
                   $("div").show(1000);
                    break;
            }
        }

         body.addEventListener("click",function (e) {
            var target=e.target;
            var radioBut = document.querySelectorAll("input[type=radio]");
            var label=document.querySelectorAll("label[for]");
            var butNext, butBack;
            butBack = document.getElementById("back");
            butNext = document.getElementById("next");     
            if(target==label[0]||target==label[1]||target==radioBut[0]||target==radioBut[1]){
                butNext.disabled=false;
            }
            if (target==div1){
                /*clear body*/
                clearBody(body);
                /*test discription*/
                var content = "<h3>What Makes You Act the Way You Do?</h3>";
                content += "<div>Without something to make it go, a machine just sits there. Humans make machines go—but what makes humans go? Psychologists have been working on finding answers to this question for a long time. The certain something that makes you go is called motivation. Motivation makes you move. Psychologists say that there are two types of motivation. Motivation from outside yourself is called extrinsic. Motivation from inside yourself is called intrinsic.</div>"
                body.innerHTML = "<div>" + content + "</div>";
                body.firstChild.className = "question";
                buttonStart = document.createElement("button");
                buttonStart.innerHTML = "Start test";
                body.firstChild.appendChild(buttonStart);
            }
            if (buttonStart&& target==buttonStart){
                clearBody(body);
                questions = getData("test1.json");
                 if (questions) {
                    i = 0;
                    createDivWithQuestion(questions[i], i);               
                }
            }
            if(target==butNext){
                saveAnswer(i);
                i++;
                if(i<questions.length){
                    showNewCard(questions, i);
                }
                else{
                    calculateAnwers(savingAnwers);
                    showResult(rez);
                }
            }
            if(target==butBack){
                i--;
                showNewCard(questions, i);
                var getRadio=document.querySelectorAll("input[type=radio]");
                var next=document.querySelector("#next");
                for(j=0;j<getRadio.length;j++){
                    if(getRadio[j].value==savingAnwers[i]){
                        getRadio[j].checked=true;
                        next.disabled=false;
                    }
                }
            }

            function  calculateAnwers(arr) {
                var val, count = 0;
                val=arr[0];
                for (j=1;j<arr.length;j++){
                    if(arr[j]==val)
                    count++;
                }
                rez[val]=count;
                for(j=1;j<arr.length;j++){
                    count=0;
                    if(rez[arr[j]])
                        continue;
                    val=arr[j];
                    for(var c=j;c<arr.length;c++){
                        if (val == arr[c])
                            count++;
                    }
                    rez[val] = count;
                }
            }
            function showResult(rez) {
                var rezults;
                /*get data from server using ajax*/
                var xhr = new XMLHttpRequest();
                xhr.open("GET","rezults.json", false);
                xhr.send();
                rezults = JSON.parse(xhr.responseText);
                var text;
                if(rez.a>=8){
                    text=rezults[0].a;
                } else if(rez.b>=8){
                    text=rezults[1].b;
                }else
                    text=rezults[2].all;
                clearBody(body);
                var divForAnwer=document.createElement("div");
                divForAnwer.className="question";
                divForAnwer.innerHTML=text;
                body.appendChild(divForAnwer);
            }
            function saveAnswer(i) {
                    for(var j=0;j<radioBut.length;j++){
                        if(radioBut[j].checked){
                            savingAnwers[i]=radioBut[j].value;
                        }
                    }   
                }

                function showNewCard(questions, i){
                    clearBody(body);
                    createDivWithQuestion(questions[i], i);
                    i++;
                }
        });       
    };
})();