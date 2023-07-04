<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <!-- <el-table-column prop="date" label="日期" width="180"> </el-table-column> -->
      <el-table-column prop="name" label="无人车序号" width="120"></el-table-column>

      <el-table-column label="位置" width="180" @click="handlelocation()">
        <template slot-scope="scope">
          <el-button type="info" icon="el-icon-map-location" @click="handlelocation()" round plain>
            {{ locations[scope.row.locate] }}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="140">
        <template slot-scope="scope">
          {{ states[scope.row.stat] }}
        </template>
      </el-table-column>
      <el-table-column prop="power" label="电量" width="160">
        <template slot-scope="scope">

          <el-progress type="circle" :percentage="scope.row.power" :color="powcolors" :width="100"/>

        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作">

        <el-button type="primary" @click="dialogTableVisible = true" plain>添加装载</el-button>

        <el-button type="warning" @click="recallVisible = true" plain>立刻遣返</el-button>

        <el-button type="danger" @click="brakeVisible = true">紧急制动</el-button>

      </el-table-column>
    </el-table>

    <!-- Table -->
    <el-dialog title="再次确认装载：" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column label="柜号">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="150"></el-table-column>
        <el-table-column property="address" label="地址" width='150'></el-table-column>
        <el-table-column property="num" label="单号"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false, handlesend()">确 认</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="！！警告！！"
      :visible.sync="brakeVisible"
      width="30%"
      :before-close="handleClose">
      <span>该操作将会终止无人车的进程。确认继续？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="brakeVisible = false">取 消</el-button>
        <el-button type="danger" @click="brakeVisible = false, handlebrake()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="！警告！"
      :visible.sync="recallVisible"
      width="30%"
      :before-close="handleClose">
      <span>该操作将会强制遣返无人车。确认继续？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="recallVisible = false">取 消</el-button>
        <el-button type="warning" @click="recallVisible = false, handlerecall()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-table .non-row {
  background: #DCDFE6;
}
</style>

<script>
export default {



 methods: {


    tableRowClassName({ row, rowIndex }) {
      if (this.tableData[rowIndex].stat == "2") {
        return "warning-row";
      } else if (this.tableData[rowIndex].stat == "0") {
        return "success-row";
      } else if (this.tableData[rowIndex].stat != "1") {
        return "non-row";
      }
      return "";
    },

    handlesend() {
        this.$notify({
        title: "完成",
        message: "装载成功，正在启动",
        type: "success",
        duration: 3000,
      });
      },

    handlebrake() {
      this.$notify({
        title: "警告",
        message: "该无人车已强制停止",
        type: "warning",
        duration: 30000,
      });
    },

    handlelocation() {
      this.$router.push("/maptest/index")
    },

    handlerecall() {
      this.$notify.info({
        title: "警告",
        message: "该无人车已强制召回",
        type: "warning",
        duration: 30000,
      });
    },
  },
  data() {
    

    return {

      recallVisible: false,
      brakeVisible: false,

      tableData: [
        {
          date: "2021-05-02",
          name: "一号",
          stat: "1",
          power: "22",
          locate :"14",
        },
        {
          date: "2021-05-04",
          name: "二号",
          stat: "2",
          power: "14",
          locate :"0",
        },
        {
          date: "2021-05-01",
          name: "三号",
          stat: "1",
          power: "94",
          locate :"25",
        },
        {
          date: "2021-05-03",
          name: "四号",
          stat: "0",
          power: "65",
          locate :"0",
        },
      ],


      gridData: [
        {
          date: '2021-05-02',
          name: '阿斯顿',
          address: '南荷',
          num: '92138eyh',
        }, {
          date: '2021-05-04',
          name: 'i青蛙',
          address: '梅苑',
          num: '1289e12e',
        }, {
          date: '2021-05-01',
          name: '权威的',
          address: '兰苑',
          num: '0j34hg934',
        }, {
          date: '2021-05-03',
          name: 'dasm',
          address: '柳苑',
          num: 'nd91238ey9',
        }],
        dialogTableVisible: false,

        powcolors: [
          {color: '#f56c6c', percentage: 20},   //红
          {color: '#e6a23c', percentage: 40},   //黄
          {color: '#6f7ad3', percentage: 60},   //紫
          {color: '#1989fa', percentage: 80},   //蓝
          {color: '#5cb87a', percentage: 100},  //绿
        ],
        locations: [
          "驿站","梅苑","兰苑","竹苑",
          "菊苑","桃苑","李苑","柳苑",
          "桂苑","荷苑","南一","南二",
          "南三","教一","教二","教三",
          "教四","教五","圆楼","行政楼",
          "青教","图书馆","青春剧场",
          "大学生活动中心","易班",
          "学科楼","东门","北门",
          "西门","南门","门诊楼",
          "体育馆","南操","北操"
        ],
        states: [
          "正常运行",
          "停留状态",
          "状态异常",
          "无法获取"
        ]
    };
  },
};
</script>