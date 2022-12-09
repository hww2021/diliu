<template>
  <div class="container">
    <el-dialog
      title="添加用户"
      :visible.sync="dialog"
      :before-close="handleClose"
    >
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addForm"
        labelPosition="top"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓">
              <el-input
                v-model="addForm.firstName"
                autocomplete="off"
                placeholder="请输入姓氏"
              >
                <i slot="prefix" class="el-input__icon">
                  <el-image :src="fistName"></el-image>
                </i>
              </el-input> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="名">
              <el-input
                v-model="addForm.lastName"
                autocomplete="off"
                placeholder="请输入名称"
              >
                <i slot="prefix" class="el-input__icon">
                  <el-image :src="fistName"></el-image>
                </i>
              </el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="addForm.username"
            autocomplete="off"
            placeholder="请输入账号，支持手机号或邮箱"
            :disabled="row ? true : false"
          >
            <i slot="prefix" class="el-input__icon">
              <el-image :src="username"></el-image>
            </i>
          </el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="区号">
              <el-select v-model="addForm.areaCode" placeholder="请选择区号">
                <i slot="prefix" class="el-input__icon">
                  <el-image :src="areaCode"></el-image>
                </i>
                <el-option
                  v-for="item in codeData"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="16">
            <el-form-item label="手机号">
              <el-input
                v-model="addForm.mobile"
                autocomplete="off"
                placeholder="请输入手机号"
              >
                <i slot="prefix" class="el-input__icon">
                  <el-image :src="mobile"></el-image>
                </i>
              </el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-form-item label="邮箱">
          <el-input
            v-model="addForm.email"
            autocomplete="off"
            placeholder="请输入邮箱"
          >
            <i slot="prefix" class="el-input__icon">
              <el-image :src="email"></el-image>
            </i>
          </el-input>
        </el-form-item>
        <el-form-item label="所属站点" prop="siteVal">
          <el-select
            v-model="addForm.siteVal"
            placeholder="请选择所属站点"
            ref="treeSelect"
          >
            <i slot="prefix" class="el-input__icon">
              <el-image :src="site"></el-image>
            </i>
            <el-option
              :label="addForm.siteName"
              :value="addForm.siteVal"
              hidden
            ></el-option>
            <el-tree
              :data="newSiteData"
              :props="defaultProps"
              @node-click="handleNodeClick"
              :default-expand-all="true"
            ></el-tree>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="addForm.role" multiple placeholder="请选择角色">
            <i slot="prefix" class="el-input__icon">
              <el-image :src="role"></el-image>
            </i>
            <el-option
              v-for="item in roleData"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="addForm.note"
            autocomplete="off"
            placeholder="请输入描述内容"
          >
            <i slot="prefix" class="el-input__icon">
              <el-image :src="note"></el-image>
            </i>
          </el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="addForm.status"
            :active-text="addForm.status ? '启用' : '停用'"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import * as api from "@/api/users.js";
export default {
  name: "",
  components: {},
  data() {
    return {
      addForm: {
        fistName: "",
        lastName: "",
        username: "",
        areaCode: 0,
        mobile: "",
        email: "",
        siteVal: "",
        siteName: "",
        role: [],
        note: "",
        status: true,
      },
      fistName: require("@/assets/firstName.png"),
      username: require("@/assets/username.png"),
      areaCode: require("@/assets/areaCode.png"),
      mobile: require("@/assets/phone.png"),
      email: require("@/assets/email.png"),
      site: require("@/assets/site.png"),
      role: require("@/assets/name.png"),
      note: require("@/assets/note.png"),
      codeData: [
        { label: "中国（+86）", value: 0 },
        { label: "美国（+1）", value: 1 },
      ],
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 3,
            max: 25,
            message: "长度在 3 到 25 个字符",
            trigger: "blur",
          },
        ],
        siteVal: [
          { required: true, message: "请选择所属站点", trigger: "change" },
        ],
        role: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
      defaultProps: {
        children: "children",
        label: "name",
        id: "id",
      },
    };
  },
  props: ["dialog", "row"],
  computed: {
    ...mapState("global", ["siteData", "roleData"]),
    newSiteData() {
      return [{ ...this.siteData, name: "总部" }];
    },
  },
  watch: {
    row(v) {
      this.addForm = {
        firstName: v.firstName,
        lastName: v.lastName,
        username: v.username,
        areaCode: v.phone && v.phone.slice(0, -11) === "+1" ? 1 : 0,
        mobile: v.phone ? v.phone.slice(-11) : "",
        email: v.email,
        siteVal: v.siteVal[0],
        siteName: v.site,
        role: v.groups.map((item) => item.id),
        note: v.note,
        status: true,
      };
    },
  },
  created() {},
  methods: {
    ...mapActions("users", ["getUserData"]),
    handleClose() {
      this.$emit("update:dialog", false);
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate();
        // this.$refs.addForm.resetField();
      });
      this.addForm = {
        fistName: "",
        lastName: "",
        username: "",
        areaCode: 0,
        mobile: "",
        email: "",
        siteVal: "",
        siteName: "",
        role: [],
        note: "",
        status: true,
      };
    },
    handleClear() {},
    handleNodeClick(data) {
      this.addForm.siteVal = data.id;
      this.addForm.siteName = data.name;
      this.$refs.treeSelect.visible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("确认提交?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(async () => {
              try {
                const params = {
                  first_name: this.addForm.fistName,
                  last_name: this.addForm.lastName,
                  username: this.addForm.username,
                  phone: this.addForm.mobile
                    ? this.addForm.areaCode === 0
                      ? "+86-" + this.addForm.mobile
                      : "+1-" + this.addForm.mobile
                    : "",
                  email: this.addForm.email,
                  site_ids: [this.addForm.siteVal],
                  group_ids: this.addForm.role,
                  note: this.addForm.note,
                  is_active: this.addForm.status,
                };
                if (this.row) {
                  await api.edit(params, this.row.id);
                } else {
                  await api.add(params);
                }
                this.getUserData();
                this.handleClose();

                this.$message({
                  type: "success",
                  message: "提交成功!",
                });
              } catch (err) {
                console.log(err.message);
              }
            })
            .catch(() => {});
        } else {
          this.$message.error("用户信息填写错误，请检查后重新提交！");
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/deep/.el-dialog {
  width: 622px !important;
}
::v-deep .el-image {
  .el-image__inner {
    vertical-align: middle !important;
  }
}
::v-deep .el-select {
  width: 100%;
}
::v-deep .el-select__tags {
  padding-left: 25px;
}
</style>
