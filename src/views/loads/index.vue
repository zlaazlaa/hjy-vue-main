<template>
  <div class="app-container">
      <!-- v-loading="listLoading" -->
      <!-- element-loading-text="Loading" -->
    <div align='middle'>
      <!-- <el-button type="success" @click="addload()">添加货物</el-button> -->
      <el-button type="danger" @click="clearload()">清空列表</el-button>
    </div>
    <br>

    <el-table
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>

      <el-table-column label="单号">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="车载柜号">
        <template slot-scope="scope">
          <el-input-number v-model="scope.$index" @change="handleChange" :min="1" :max="20"></el-input-number>
        </template>
      </el-table-column>


      <el-table-column align="center" width="150" class-name="small-padding fixed-width">
        <template>
          <!-- <el-button type="primary" size="mini" @click="editload()">
            编辑
          </el-button> -->
          <!-- <el-button size="mini" type="success">
            发布
          </el-button> -->
          <!-- <el-button size="mini" @click="handleModifyStatus(row, status)">
            清除
          </el-button> -->
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)" plain>
            删除
          </el-button>
        </template>
      </el-table-column>
      
      <!-- <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       published: 'success',
  //       draft: 'gray',
  //       deleted: 'danger'
  //     }
  //     return statusMap[status]
  //   }
  // },
  data() {
    return {
      list: null,
      //listLoading: true
      num: 1,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList()
      .then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },

    editload() {
      this.$router.push("/editloads/index")
    },

    addload() {
      this.$router.push("/addloads/index")
    },

    clearload() {
      this.list = null
      this.$notify.info({
        title: '消息',
        message: '清除完毕'
      }); 
    },

    handleDelete(row, index) {
      this.$notify({
        title: '完成',
        message: '刪除成功',
        type: 'success',
        duration: 1000
      })
      this.list.splice(index, 1)
    },
    
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    }
  }
}
</script>
