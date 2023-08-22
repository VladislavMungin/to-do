'use strict'
window.addEventListener('DOMContentLoaded',()=>{

    let input = document.querySelector('#title-task'),
    add = document.querySelector('.add-button'),
    list = document.querySelector('.to-do__list'),
    listCompleated = document.querySelector('.to-do__list-compl'),
    counter = document.querySelector('#count-task');
    let listItems=localStorage.getItem('array') ? localStorage.getItem('array').split(',') : [],
        listComplItem = localStorage.getItem('compl') ? localStorage.getItem('compl').split(',') : []
    
    

    //get local

    function getItems(nameList,nameItem,flag){
        nameItem.forEach(el=>{
            let listItem = document.createElement('li');
            listItem.classList.add('to-do__list-item');
            
            listItem.innerHTML=`
                <button class="to-do__list-button compleate">
                    <img class="compleateImg${flag ? ' compl':' start'}" src="./img/compleate.svg"/>       
                </button>
                <p class="to-do__list-text ${flag?'checked':''}">${el}</p>
                <button class="to-do__list-button delete">
                    <img class="deleteImg${flag ? ' complDel':' startDel'}" src="./img/Krestiksvgpng.ru_.svg"/>                         
                </button>
                `;
            
            nameList.append(listItem);
        })
    }

    

    getItems(list,listItems,false);
    getItems(listCompleated,listComplItem,true);
    function setSelect(){
        if(localStorage.getItem('even')==='1'){
            let taskList = document.querySelectorAll('.to-do__list-item');
    
            taskList.forEach((el,i)=>{
                el.classList.remove('selected')
            })
            taskList.forEach((el,i)=>{
                if((i%2)){
                    el.classList.add('selected');
                }
            })
        }
    
        if(localStorage.getItem('odd')==='1'){
            let taskList = document.querySelectorAll('.to-do__list-item');
    
            taskList.forEach((el,i)=>{
                el.classList.remove('selected')
            })
            taskList.forEach((el,i)=>{
                if((i%2)){
                    el.classList.add('selected');
                }
            })
        }
    }
    setSelect();

    counter.innerHTML=`${listItems.length+listComplItem.length}`;

    //add item

    add.addEventListener('click',(e)=>{
        e.preventDefault();
        let listItem = document.createElement('li');
        listItem.classList.add('to-do__list-item')
        if(input.value==''){
            return
        } else {
            listItem.innerHTML=`
            <button class="to-do__list-button compleate">
                <img class="compleateImg start" src="./img/compleate.svg"/>
            </button>
            <p class="to-do__list-text">${input.value}</p>
            <button class="to-do__list-button delete">
                <img class="deleteImg startDel" src="./img/Krestiksvgpng.ru_.svg"/>                        
            </button>
            `;
            list.append(listItem)
        }
        listItems.push(input.value);
        localStorage.setItem('array',listItems.join());
        counter.innerHTML=`${listItems.length+listComplItem.length}`;
        input.value='';
        setSelect();
    })

    //delete item

    document.addEventListener('click',(e)=>{
        const target = e.target;
        if(target && (target.classList.contains('deleteImg') || target.classList.contains('delete'))){
            
            if(target.classList.contains('complDel')){
                let items = document.querySelectorAll('.complDel');

                items.forEach((el,i)=>{
                    if(el==target){
                        listComplItem.splice(i,1);
                        localStorage.setItem('compl',listComplItem.join());
                        listCompleated.innerHTML='';
                        getItems(listCompleated,listComplItem,true);
                        setSelect();
                    }
                })
            } else {
                let items = document.querySelectorAll('.startDel');

                items.forEach((el,i)=>{
                    if(el==target){
                        listItems.splice(i,1);
                        localStorage.setItem('array',listItems.join());
                        list.innerHTML='';
                        getItems(list,listItems,false);
                        setSelect();
                    }
                })
            }
        }
        counter.innerHTML=`${listItems.length+listComplItem.length}`;
    })

    //comleate item

    document.addEventListener('click',(e)=>{
        const target = e.target;
        if(target && (target.classList.contains('comleate') || target.classList.contains('compleateImg'))){
            
            if(target.classList.contains('compl')){
                let items = document.querySelectorAll(`.compl`);
                items.forEach((el,i)=>{
                    if(el==target){
                        listItems.push(listComplItem[i]);
                        listComplItem.splice(i,1);
                        localStorage.setItem('array',listItems.join());
                        localStorage.setItem('compl',listComplItem.join());
                        list.innerHTML='';
                        listCompleated.innerHTML='';
                        getItems(list,listItems,false);
                        getItems(listCompleated,listComplItem,true);
                        setSelect();
                    } 
                })
            } else {
                let items = document.querySelectorAll(`.start`);
                items.forEach((el,i)=>{
                    if(el==target){
                        listComplItem.push(listItems[i]);
                        listItems.splice(i,1);
                        localStorage.setItem('array',listItems.join());
                        localStorage.setItem('compl',listComplItem.join());
                        list.innerHTML='';
                        listCompleated.innerHTML='';
                        getItems(list,listItems,false);
                        getItems(listCompleated,listComplItem,true);
                        setSelect();
                    } 
                })
            }
        }
    })
    
    //delete first

    const buttonDelFirst = document.querySelector('#delFirst');

    buttonDelFirst.addEventListener('click',(e)=>{
        e.preventDefault();
        listItems.shift()
        localStorage.setItem('array',listItems.join());
        list.innerHTML='';
        getItems(list,listItems,false);
        setSelect();
    })

    //delete last

    const buttonDelLast = document.querySelector('#delLast');

    buttonDelLast.addEventListener('click',(e)=>{
        e.preventDefault();
        listItems.pop();
        localStorage.setItem('array',listItems.join());
        list.innerHTML='';
        getItems(list,listItems,false);
        setSelect();
        
    })

    //select even

    const buttonSelectEven = document.querySelector('#selectEven')
    buttonSelectEven.addEventListener('click',(e)=>{
        e.preventDefault();
        let taskList = document.querySelectorAll('.to-do__list-item');

        if(taskList[1].classList.contains('selected')){
           localStorage.removeItem('even')
            taskList.forEach((el,i)=>{
                if((i%2)){
                    el.classList.remove('selected');
                }
            })
        } else {
            localStorage.setItem('even',1)
            localStorage.removeItem('odd')

            taskList.forEach((el,i)=>{
                el.classList.remove('selected')
            })
            taskList.forEach((el,i)=>{
                if((i%2)){
                    el.classList.add('selected');
                }
            })
        }
    })

    //select odd

    const buttonSelectOdd = document.querySelector('#selectOdd');
          

    buttonSelectOdd.addEventListener('click',(e)=>{
        e.preventDefault();
        let taskList = document.querySelectorAll('.to-do__list-item');

        if(taskList[0].classList.contains('selected')){
            localStorage.removeItem('odd')
            taskList.forEach((el,i)=>{
                if(!(i%2)){
                    el.classList.remove('selected');
                }
            })
        } else {
            localStorage.setItem('odd',1)
            localStorage.removeItem('even');
            taskList.forEach((el,i)=>{
                el.classList.remove('selected')
            })
            taskList.forEach((el,i)=>{
                if(!(i%2)){
                    el.classList.add('selected');
                }
            })
        }
    })
})
