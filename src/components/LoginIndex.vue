<template>
  <div class="login">

    <div v-if="showIndex == false ? true : false">
      <Particles id="tsparticles" :options='particles' />

      <div class="box-login">
        <div class="register">
          <transition name="re-back">
            <div v-if="loginRegister == false ? true : false" class="register-back"></div>
          </transition>
          <transition name="re-cont">
            <div v-if="loginRegister == true ? true : false" class="register-content">

              <div class="register-title">注册</div>
              <div class="register-from">
                <el-form label-position="left" label-width="auto" ref="registerFormRef" :model='formLabelRegister'
                  :rules="rulesRegister">
                  <el-form-item label="用户名" prop="registerName">
                    <el-input v-model="formLabelRegister.registerName" />
                  </el-form-item>
                  <el-form-item label="密码" prop="registerPassword">
                    <el-input type="password" v-model="formLabelRegister.registerPassword" />
                  </el-form-item>
                  <el-form-item label="身份证" prop="registerId">
                    <el-input v-model="formLabelRegister.registerId" />
                  </el-form-item>
                  <el-form-item label="电话号码" prop="registerPhone">
                    <el-input v-model="formLabelRegister.registerPhone" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitRegisterForm(registerFormRef)">提交</el-button>
                    <el-button @click="resetRegisterForm(registerFormRef)">重置</el-button>
                  </el-form-item>

                </el-form>

              </div>
            </div>
          </transition>
        </div>
        <div class="box-login-l">
          <transition name="re-back-lo">
            <div v-if="loginRegister == false ? false : true" class="register-back"></div>
          </transition>
          <transition name="re-cont">
            <div v-if="loginRegister == true ? false : true" class="box-login-r">
              <div class="login-title">Login</div>
              <div class="login-from">
                <el-form label-position="left" label-width="auto" ref="ruleFormRef" :model="formLabelAlign"
                  :rules="rules" status-icon>
                  <el-form-item label="用户名" prop="userName">
                    <el-input v-model="formLabelAlign.userName" />
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input v-model="formLabelAlign.password" type="password" />
                  </el-form-item>
                  <el-form-item label="验证码" prop="verificationCode">
                    <!-- <el-input v-model="formLabelAlign.verificationCode" /> -->

                    <slide-verify w="200" h="50" show="false" ref="block" :slider-text="text" :accuracy="accuracy"
                      @again="onAgain" @success="onSuccess" @fail="onFail" @refresh="onRefresh"></slide-verify>
                    <div :class="msgColor == true ? 'verification-success' : 'verification-fail'">{{ msg }}</div>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                  </el-form-item>

                </el-form>

              </div>
              <div class="login-register">
                <div class="register-c" @click="changeLogin">注册</div>
              </div>
            </div>
          </transition>
        </div>


      </div>
    </div>
    <div v-if="showIndex == true ? true : false">
      <Index></Index>
    </div>
  </div>

</template>

<script lang="ts" setup>
//背景动画
import { onMounted } from 'vue';
import { particles1, particles, particles2, particles3 } from "../js/particles.js";
import Index from '../components/index.vue'
import axios from "axios";
import { useRouter } from "vue-router"
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus'
import { addUser, Ceshi } from '../axios/api'
import SlideVerify, { SlideVerifyInstance } from "vue3-slide-verify";
import "vue3-slide-verify/dist/style.css";
import { el } from "element-plus/es/locale/index.js";
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const registerFormRef = ref<FormInstance>()
//滑动验证
const msg = ref('')
const msgColor = ref(false)
const text = ref('向右滑动->')
const accuracy = ref(1)
const block = ref<SlideVerifyInstance>();

onMounted(() => {
  // console.log(1);
  getCeshiApi();
});
const getCeshiApi = async () => {
  try {
    await Ceshi().then((res) => {
      console.log(res);
    })
  } catch (err) {
    console.log(err);
  }
};

const onAgain = () => {
  msg.value = "检测到非人为操作的哦！ try again";
  // 刷新
  block.value?.refresh();
};
const onSuccess = (times: number) => {
  msg.value = `login success, 耗时${(times / 1000).toFixed(1)}s`;
  msgColor.value = true;
};
const onFail = () => {
  msg.value = "验证不通过";
  msgColor.value = false;
};
const onRefresh = () => {
  msg.value = "点击了刷新小图标";
};
// 
var showIndex = ref(false)
const routerJump = () => {
  const newpage = router.resolve({
    path: '/index',
  })
  window.open(newpage.href)
}
const formLabelAlign = reactive({
  userName: '',
  password: '',
  verificationCode: ''
})
const formLabelRegister = reactive({
  registerName: '',
  registerId: '',
  registerPhone: '',
  registerPassword: ''

})
//判断规则
const rules = reactive({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' },
  { min: 3, max: 8, message: '用户名的长度3-5字符', trigger: 'blur' },],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value === '123456') {
          callback(new Error('密码太简单，请重新输入'))
        } else {
          callback()
        }
      },
      triggle: 'blur'
    },

    // { required: true, message: '以字母开头，长度在6~18之间，只能包含字符、数字和下划线', trigger: 'blur', pattern: /^[a-zA-Z]\w{5,17}$/ }
  ],
  // verificationCode: [{ validator: verCode, trigger: 'blur' }],
})
const rulesRegister = reactive({
  registerName: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 3, max: 10, message: '用户名的长度3-10字符', trigger: 'blur' }],
  registerPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }, {
    validator: (rule: any, value: string, callback: any) => {
      if (value === '123456') {
        callback(new Error('密码太简单，请重新输入'))
      } else {
        callback()
      }
    },
    triggle: 'blur'
  },],
  registerPhone: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { required: true, message: '输入正确的手机号', trigger: 'blur', pattern: /^(1[3-9][0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/ }],
  registerId: [{ required: true, message: '请输入身份证号', trigger: 'blur' }, { required: true, message: '输入正确的身份证号', trigger: 'blur', pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/ }]
})

//切换注册登录值
const loginRegister = ref(false)
// 登录页面  注册按钮
const changeLogin = () => {
  loginRegister.value = true
  let obj = {
    username: 'aaaaaaa',
    password: '11111111111'
  }
}
//登录按钮
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid == true) {
      console.log('submit!')
      showIndex.value = true
    } else {
      console.log('error submit!', fields)
      return false
    }
  })


}
//登录重制
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields();
  onRefresh();
}
//注册页面提交按钮
const submitRegisterForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      console.log('注册成功')
      console.log(formLabelRegister);
      ElMessage({
        showClose: true,
        message: '注册成功',
        grouping: true,
        type: 'success',
        center: true,
      })
      // loginRegister.value = false
    } else {
      console.log('注册失败!');
      ElMessage({
        showClose: true,
        message: '注册失败!',
        type: 'error',
        grouping: true,
        center: true,
      });
      return false;
    }
  })
}
//注册页面重置
const resetRegisterForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style scoped lang="less">
.login {
  position: relative;
  height: 100vh;

  .box-login {
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    // opacity: 0.5;
    width: 600px;
    height: 400px;
    border-radius: 15px;
    // padding: 0 10px;
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translate(-50%, -50%);
    z-index: 999;
    display: flex;
    justify-content: space-between;
    // align-items: center;

    .register {
      flex: 1;
      overflow: hidden;
      box-sizing: border-box;

      .register-content {
        box-sizing: border-box;
        padding: 20px;

        .register-title {
          // margin: 10px 0;
          font-size: 20px;
          text-align: center;
          background-image: -webkit-linear-gradient(top, #00f, #f00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
      }

      .re-back-enter-active {
        animation: bounce 4s ease;
      }

      .re-back-leave-active {
        animation: bounce 4s ease reverse;
      }

      @keyframes bounce {
        0% {
          transform: translateX(300px);
        }

        50% {
          transform: translateX(50px);
        }

        100% {
          transform: translateX(0);
        }
      }

      .register-back {
        width: 100%;
        height: 100%;
        background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202105%2F21%2F20210521113808_f11e7.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659601492&t=2ac5c06aaa650f922c0804f9d68bd6e4') no-repeat 100% 100%;
        background-size: 100% 100%;
        border-radius: 15px 0 0 15px;
        z-index: 99;
      }
    }

    .register-re {
      flex: 1;

    }

    .box-login-l {
      flex: 1;
      box-sizing: border-box;
      overflow: hidden;


      .box-login-r {
        width: 100%;
        height: 100%;
        padding: 0 20px;
        box-sizing: border-box;

        .login-title {
          font-size: 26px;
          // color: #ffeb3b;
          background: linear-gradient(to right, red, blue);
          -webkit-background-clip: text;
          color: transparent;
          text-align: center;
          margin: 8px 0;
        }

        .login-from {
          .verification-success {
            color: greenyellow;
          }

          .verification-fail {
            color: red;
          }
        }

        .login-register {

          // text-align: center;
          .register-c {
            margin: 0 auto;
            // width: 100px;
            text-align: right;
            background: linear-gradient(to right, red, blue);
            -webkit-background-clip: text;
            color: transparent;
            cursor: pointer;
          }

        }

      }

      .re-back-lo-enter-active {
        animation: bounces 4s ease;
      }

      .re-back-lo-leave-active {
        animation: bounces 4s ease reverse;
      }

      @keyframes bounces {
        0% {
          transform: translateX(-300px);
        }

        50% {
          transform: translateX(-50px);
        }

        100% {
          transform: translateX(0);
        }
      }


      .register-back {
        width: 100%;
        height: 100%;
        background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2-chuzhan.qingwk.com%2Fimages%2Fresource%2F2020%2F09%2F26%2F84h622746p1.jpg%3FimageView2%2F3%2Fq%2F100%2Finterlace%2F1%2Fw%2F1600%2Fh%2F1600&refer=http%3A%2F%2Fimg2-chuzhan.qingwk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659605591&t=7f824a04a575407379a9894c7f3791ef') no-repeat 100% 100%;
        background-size: 100% 100%;
        border-radius: 0 15px 15px 0;
        z-index: 9;
      }
    }

  }

  .box_login {
    background-color: #fff;
    width: 358px;
    height: 400px;
    border-radius: 15px;
    padding: 0 50px;
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b,
        #03a9f4, #f441a5, #ffeb3b, #03a9f4);

  }

  .box_login:hover {
    animation: animate 8s linear infinite alternate;
  }

  @keyframes animate {
    0% {
      background-position: 0%;
      /*修改背景定位，实现渐变色炫光*/
    }

    50% {
      background-position: 100%;
    }

    100% {
      background-position: 0%;
    }
  }

  .box_login::before {
    content: '';
    position: absolute;
    /*绝对定位*/
    top: -5px;
    /*当设置对立的2个定位属性时，元素的大小将由对立的大小决定*/
    left: -5px;
    right: -5px;
    bottom: -5px;
    /*当设置对立的2个定位属性时，元素的大小将由对立的大小决定*/
    z-index: -1;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4,
        #f441a5, #ffeb3b, #03a9f4);
    border-radius: 40px;
    background-size: 400%;
    filter: blur(20px);
    /*过渡：模糊*/
    opacity: 0;
    /*透明度*/
    transition: 1s;
    /*过渡时间*/
  }

  .box_login:hover::before {
    filter: blur(20px);
    opacity: 1;
    animation: animate 8s linear infinite;
    /*注意动画名称统一*/
  }
}
</style>