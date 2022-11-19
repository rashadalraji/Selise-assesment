import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  
  constructor(private fb: FormBuilder,
   
    ) { }
  myForm: FormGroup | any;
  isPlusButtonClicked: boolean = false;
  isSaved: boolean = false;
  isError: boolean = false;
 

  categoryList = [
    {
      categoryName: 'Category A',
      categoryId: 1,
      categoryDetails: [
        {
          title: 'Javascript',
          id: 1,
          url: ''
        },
        {
          title: 'Angular',
          id: 2,
          url: ''
        },
        {
          title: 'React',
          id: 3,
          url: ''
        }
      ]
    },
    {
      categoryName: 'Category B',
      categoryId: 2,
      categoryDetails: [
        {
          title: 'Food',
          id: 1,
          url: ''
        },
        {
          title: 'Buger',
          id: 2,
          url: ''
        },

      ]
    }
  ]

  categoryDtl: any = {
    title: null,
    url: null,
    category: null,
  }

  // FormControl:any({value: '', disabled: true})

  ngOnInit() {
    

   this.onLoadCaustomModal()
  }


  onLoadCaustomModal(){
    this.myForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(30)]],
      url: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
   
      category: ['', Validators.required],
      new_category: [''],
    });
  }


  onClickDetails(dtlCategory: any, categoryName: any) {
    console.log(categoryName)
    this.categoryDtl.title = dtlCategory.title;
    this.categoryDtl.url = dtlCategory.url;
    this.categoryDtl.category = categoryName;
  }

  showCustomModal: boolean = false;

  onClickAddBookMark() {
    this.showCustomModal = true;
  }

  onClickClose() {
    this.showCustomModal = false;
    this.isPlusButtonClicked = false;
    this.onLoadCaustomModal()
  }

  onClickAddCategory() {
    this.isPlusButtonClicked = true;
    this.disableField()
  }

  onClickTitle(dtlCategory:any){
    if(dtlCategory.url !=""){
    window.open(dtlCategory.url,"_blank")
    }
  }

  disableField(){   
      this.myForm.controls['category'].disable();    
    
  }
  


  onSubmit(form: FormGroup) {
    if (form.valid) {
      if (this.isPlusButtonClicked) {
        let lastIndex = this.categoryList.length - 1;
        let obj = {
          categoryName: form.value.new_category,
          categoryId: this.categoryList[lastIndex].categoryId + 1,
          categoryDetails: [
            {
              title: form.value.title,
              id: 1,
              url: form.value.url
            }]
        }
        this.categoryList.push(obj)
      } else {
        if (form.value.category) {
          let index = this.categoryList.findIndex(el => el.categoryId == form.value.category);
          if (index >= 0) {
            let lastIndex = this.categoryList[index].categoryDetails.length - 1;
            let dtlObj = {
              title: form.value.title,
              id: this.categoryList[index].categoryDetails[lastIndex].id + 1,
              url: form.value.url
            }
            this.categoryList[index].categoryDetails.push(dtlObj)
          }
        }
      }

      this.isPlusButtonClicked = false;
      this.onClickClose();
      this.onLoadCaustomModal();
      
      this.isSaved = true;
      setTimeout(()=>{
        this.isSaved = false
      },5000)

     
    }else{
     
      this.isError = true;
      setTimeout(()=>{
        this.isError = false
      },5000)
    }
   
  }

}
