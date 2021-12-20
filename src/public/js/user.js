document.addEventListener("DOMContentLoaded", function () {
    $('#side-menu-btn').click(() => {
        if($('#side-menu-container').hasClass('side-menu-is-open')){
            $('#side-menu-container').removeClass('side-menu-is-open')
            $('#side-menu-btn').removeClass('side-menu-btn-is-open')
        }else{
            $('#side-menu-container').addClass('side-menu-is-open')
            $('#side-menu-btn').addClass('side-menu-btn-is-open')
        }
        
    })
    var selectAllCheckbox = $('#select-all-checkbox')
    var clientCheckbox = $('input[name="clientIds[]"]')
    var recruitmentCheckbox = $('input[name="recruitmentIds[]"]')
    var memberCheckbox = $('input[name="memberIds[]"]')
    selectAllCheckbox.change(()=>{
     var isCheckedAll = selectAllCheckbox.prop('checked')
        if(isCheckedAll === true){
            $('.disable-btn').addClass('clickable-btn')
        }else{
            $('.disable-btn').removeClass('clickable-btn')
        }
        clientCheckbox.prop('checked',isCheckedAll)
    })
    clientCheckbox.change(()=>{
        var isCheckedAll = clientCheckbox.length === $('input[name="clientIds[]"]:checked').length;
        selectAllCheckbox.prop('checked',isCheckedAll)
        if($('input[name="clientIds[]"]:checked').length > 0){
            $('.disable-btn').addClass('clickable-btn')
        }else{
            $('.disable-btn').removeClass('clickable-btn')
        }
    })

    selectAllCheckbox.change(()=>{
        var isCheckedAll = selectAllCheckbox.prop('checked')
           if(isCheckedAll === true){
               $('.disable-btn').addClass('clickable-btn')
           }else{
               $('.disable-btn').removeClass('clickable-btn')
           }
           recruitmentCheckbox.prop('checked',isCheckedAll)
       })
       recruitmentCheckbox.change(()=>{
           var isCheckedAll = recruitmentCheckbox.length === $('input[name="recruitmentIds[]"]:checked').length;
           selectAllCheckbox.prop('checked',isCheckedAll)
           if($('input[name="recruitmentIds[]"]:checked').length > 0){
               $('.disable-btn').addClass('clickable-btn')
           }else{
               $('.disable-btn').removeClass('clickable-btn')
           }
       })

    selectAllCheckbox.change(()=>{
     var isCheckedAll = selectAllCheckbox.prop('checked')
        if(isCheckedAll === true){
            $('.disable-btn').addClass('clickable-btn')
            $('.select-all').addClass('tr-checked')
        }else{
            $('.disable-btn').removeClass('clickable-btn')
            $('.select-all').removeClass('tr-checked')
        }
        memberCheckbox.prop('checked',isCheckedAll)
    })
    memberCheckbox.change(()=>{
        var isCheckedAll = memberCheckbox.length === $('input[name="memberIds[]"]:checked').length;
        selectAllCheckbox.prop('checked',isCheckedAll)
        if($('input[name="memberIds[]"]:checked').length > 0){
            $('.disable-btn').addClass('clickable-btn')
        }else{
            $('.disable-btn').removeClass('clickable-btn')
        }
    })






    const hiddenAddMemberForm = $('#hidden-add-form')
    $('#add-member-btn').click(()=>{
        
        hiddenAddMemberForm.show()
    })
    $('#hide-add-form').click(()=>{
        hiddenAddMemberForm.hide()
    })
    $(document).mouseup(function(e) {
        if (hiddenAddMemberForm.is(e.target)) 
        {
           
            hiddenAddMemberForm.hide()
        }
        if ($('.hidden-form').is(e.target)) 
        {
           
            $('.hidden-form').hide();
        }
        if ($('.hidden-disbursed-form').is(e.target)) 
        {
           
            $('.hidden-disbursed-form').hide();
        }

    })
    const hiddenDeleteClientForm = $('#hidden-delete-client-form')
    const hiddenDeleteMemberForm = $('#hidden-delete-member-form')
    const hiddenDeleteRecruitmentForm = $('#hidden-delete-recruitment-form')
    $('.delete-btn').click((e)=>{
        let rawid = e.target.id.split('');
        
        let id = rawid.slice(1).join('');
        console.log(id)
        $('#hidden-form').show()
        $('#accept-delete-client').click(()=>{
            hiddenDeleteClientForm.attr('action',  `/user/client/delete/${id}`);
            
            hiddenDeleteClientForm.submit()
        })
        $('#accept-delete-member').click(()=>{
            hiddenDeleteMemberForm.attr('action',  `/user/member/delete/${id}`);
            
            hiddenDeleteMemberForm.submit()
        })
        $('#accept-delete-recruitment').click(()=>{
            hiddenDeleteRecruitmentForm.attr('action',  `/user/recruitment/delete/${id}`);
            
            hiddenDeleteRecruitmentForm.submit()
        })
    });
    $('.hide-form').click(()=>{ 
        $('.hidden-form').hide()
    })
    $('#hide-disburse-form').click(()=>{ 
        $('.hidden-disbursed-form').hide()
    })

    $('.disbursed-btn').click((e)=>{ 
        let rawid = e.target.id.split('');
        
        let id = rawid.slice(1).join('');
        console.log(id)
        $('.hidden-disbursed-form').show()
        $('#submit-disburse-form').click(()=>{
            $('#disbursed-form').attr('action',  `/user/client/disbursed/${id}`);
            
            $('#disbursed-form').submit()
        })
    })

    $('#action-select').on('change', function() {
        if(this.value == 'send-client-option'){
            $('#member-select').show()
            $('#open-send-modal-btn').hide()
            $('#open-done-modal-btn').hide()
            $('#open-delete-modal-btn').hide()

        }else if(this.value == 'delete-client-option'){
            $('#member-select').hide()
            $('#open-send-modal-btn').hide()
            $('#open-done-modal-btn').hide()
            $('#open-delete-modal-btn').show()
            
        }else if(this.value == 'delete-recruitment-option'){
            $('#member-select').hide()
            $('#open-send-modal-btn').hide()
            $('#open-done-modal-btn').hide()
            $('#open-delete-modal-btn').show()
            
        }else if(this.value == 'done-client-option'){
            $('#member-select').hide()
            $('#open-send-modal-btn').hide()
            $('#open-done-modal-btn').show()
            $('#open-delete-modal-btn').hide()
          
        }else{
            $('#member-select').hide()
            $('#open-send-modal-btn').hide()
            $('#open-done-modal-btn').hide()
            $('#open-delete-modal-btn').hide()
        }
      });
    $('#member-select').on('change', function() {
        if(this.value != ''){
            
            $('#open-send-modal-btn').show()
            
        }else{
            $('#open-send-modal-btn').hide()
        }
    })
    $('#open-delete-modal-btn').click(()=>{
        $('#hidden-delete-many-form').show()
    })
    
    $('#open-done-modal-btn').click(()=>{
        $('#hidden-done-many-form').show()
    }) 

    $('#open-send-modal-btn').click(()=>{
        $('#hidden-send-many-form').show()
    })
    
    $('.accept-submit-form').click(()=>{
        $('#handleForm').submit()
    })


    $('#open-delete-many-member-btn').click(()=>{
        $('#hidden-delete-many-member-form').show()
    })
    $('#accept-delete-many-member').click(()=>{
        $('#memberHandleForm').submit()
    })


    const smallNavMenu = $('.nav-icon-box')
    smallNavMenu.click(() =>{
    if(smallNavMenu.hasClass('is-open')){
        smallNavMenu.removeClass('is-open')
        $('.side-menu').removeClass('side-is-open')
    }else{
        $('.side-menu').addClass('side-is-open')
        smallNavMenu.addClass('is-open')
    }
    })

    $('.check-box-add-class').change((e)=>{
        let id = e.target.value
        var trCheckbox = $(`#${id}`).prop('checked')
        
        if(trCheckbox === true){
            $(`#tr${id}`).addClass('tr-checked')
        }else{
            $(`#tr${id}`).removeClass('tr-checked')
        }
        // if($(`#${id}`).prop('checked',true)){
        //     $(`#tr${id}`).addClass('tr-checked')
        //     console.log(id)
        // }else{
        //     $(`#tr${id}`).removeClass('tr-checked')
        // }
        
        
    })

})