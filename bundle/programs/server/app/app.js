var require = meteorInstall({"both":{"methods":{"restaurant":{"QR":{"codeGenerator.js":["../../../models/restaurant/node","typescript-collections",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/restaurant/QR/codeGenerator.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var node_1 = require("../../../models/restaurant/node");                                                               // 1
var Collections = require("typescript-collections");                                                                   // 3
var CodeGenerator = (function () {                                                                                     // 5
    function CodeGenerator(_pStringToConvert) {                                                                        //
        this.diccionary = new Collections.Dictionary();                                                                //
        this.sortList = new Array();                                                                                   //
        this.map = new Collections.Dictionary();                                                                       //
        this.finalTree = new node_1.Node();                                                                            //
        this.binaryCode = '';                                                                                          //
        this.significativeBits = 0;                                                                                    //
        this.stringToConvert = _pStringToConvert;                                                                      //
        this.finalTree.createNodeExtend(0, 256, null, null);                                                           //
        this.finalBytes = [];                                                                                          //
    }                                                                                                                  //
    CodeGenerator.prototype.generateCode = function () {                                                               //
        this.buildFrecuencyTable();                                                                                    //
        this.sortData();                                                                                               //
        this.createTree();                                                                                             //
        this.codeTree();                                                                                               //
        this.createQRCode();                                                                                           //
    };                                                                                                                 //
    CodeGenerator.prototype.buildFrecuencyTable = function () {                                                        //
        var _lNode;                                                                                                    //
        var _lChars = 0;                                                                                               //
        for (var _i = 0; _i < this.stringToConvert.length; _i++) {                                                     //
            _lChars = this.stringToConvert.charCodeAt(_i);                                                             //
            _lNode = this.diccionary.getValue('' + _lChars);                                                           //
            if (_lNode == null) {                                                                                      //
                var _lAux = new node_1.Node();                                                                         //
                _lAux.createNode(_lChars);                                                                             //
                this.diccionary.setValue(_lChars + '', _lAux);                                                         //
            }                                                                                                          //
            else {                                                                                                     //
                _lNode.setFrecuency(_lNode.getFrecuency() + 1);                                                        //
            }                                                                                                          //
        }                                                                                                              //
    };                                                                                                                 //
    CodeGenerator.prototype.sortData = function () {                                                                   //
        var _this = this;                                                                                              //
        var _lNode;                                                                                                    //
        var _lFrecuency;                                                                                               //
        var _lSortFrecuency = [];                                                                                      //
        var _lSortTMP = new Array();                                                                                   //
        var _AuxCont = 0;                                                                                              //
        for (var _i = 0; _i <= 255; _i++) {                                                                            //
            _lSortTMP.splice(0, 0, 0);                                                                                 //
        }                                                                                                              //
        this.diccionary.values().forEach(function (res) {                                                              //
            _lSortFrecuency.splice(_AuxCont, 0, res.getFrecuency());                                                   //
            _lSortTMP.splice(res.getChar(), 1, res.getFrecuency());                                                    //
            _AuxCont++;                                                                                                //
        });                                                                                                            //
        _lSortFrecuency.sort();                                                                                        //
        _lSortFrecuency.forEach(function (nod) {                                                                       //
            var tmp = _lSortTMP.indexOf(nod);                                                                          //
            _lSortTMP.splice(tmp, 1, 0);                                                                               //
            var tmpNode = new node_1.Node();                                                                           //
            tmpNode.createNodeExtend(nod, tmp, null, null);                                                            //
            _this.sortList.push(tmpNode);                                                                              //
        });                                                                                                            //
    };                                                                                                                 //
    CodeGenerator.prototype.createNewNode = function (_pNodeLeft, _pNodeRight) {                                       //
        var _lNewNode = new node_1.Node();                                                                             //
        var _lFrecuencyNewNode;                                                                                        //
        _lFrecuencyNewNode = (_pNodeLeft.getFrecuency() + _pNodeRight.getFrecuency());                                 //
        _lNewNode.createNodeExtend(0, 256, null, null);                                                                //
        _lNewNode.setFrecuency(_lFrecuencyNewNode);                                                                    //
        _lNewNode.setNodeLeft(_pNodeLeft);                                                                             //
        _lNewNode.setNodeRight(_pNodeRight);                                                                           //
        return _lNewNode;                                                                                              //
    };                                                                                                                 //
    CodeGenerator.prototype.insertNewNode = function (_pNewNode, _pSortList) {                                         //
        var _lFirstNode = new node_1.Node();                                                                           //
        var _lSecondNode = new node_1.Node();                                                                          //
        _lFirstNode.createNodeExtend(0, 256, null, null);                                                              //
        _lSecondNode.createNodeExtend(0, 256, null, null);                                                             //
        _pSortList.splice(0, 0, _pNewNode);                                                                            //
        for (var _i = 0; _i < _pSortList.length - 1; _i++) {                                                           //
            _lFirstNode = _pSortList[_i];                                                                              //
            _lSecondNode = _pSortList[(_i + 1)];                                                                       //
            if (_lFirstNode.getFrecuency() >= _lSecondNode.getFrecuency()) {                                           //
                _pSortList.splice((_i + 1), 1, _lFirstNode);                                                           //
                _pSortList.splice(_i, 1, _lSecondNode);                                                                //
            }                                                                                                          //
        }                                                                                                              //
        return _pSortList;                                                                                             //
    };                                                                                                                 //
    CodeGenerator.prototype.createTree = function () {                                                                 //
        var _lTempNodeLeft = new node_1.Node();                                                                        //
        var _lTempNodeRight = new node_1.Node();                                                                       //
        var _lTempNewNode = new node_1.Node();                                                                         //
        _lTempNodeLeft.createNodeExtend(0, 256, null, null);                                                           //
        _lTempNodeRight.createNodeExtend(0, 256, null, null);                                                          //
        _lTempNewNode.createNodeExtend(0, 256, null, null);                                                            //
        while (this.sortList.length != 1) {                                                                            //
            _lTempNodeLeft = this.sortList.shift();                                                                    //
            _lTempNodeRight = this.sortList.shift();                                                                   //
            _lTempNewNode = this.createNewNode(_lTempNodeLeft, _lTempNodeRight);                                       //
            this.sortList = this.insertNewNode(_lTempNewNode, this.sortList);                                          //
        }                                                                                                              //
        this.finalTree = this.sortList.shift();                                                                        //
        this.preOrder(this.finalTree, "");                                                                             //
    };                                                                                                                 //
    CodeGenerator.prototype.preOrder = function (_pNode, _pVal) {                                                      //
        if (_pNode.getNodeLeft() == null && _pNode.getNodeRight() == null) {                                           //
            this.map.setValue(_pNode.getChar() + '', _pVal);                                                           //
            return;                                                                                                    //
        }                                                                                                              //
        this.preOrder(_pNode.getNodeLeft(), _pVal.concat("1"));                                                        //
        this.preOrder(_pNode.getNodeRight(), _pVal.concat("0"));                                                       //
    };                                                                                                                 //
    CodeGenerator.prototype.codeTree = function () {                                                                   //
        var _lCodeBytes = '';                                                                                          //
        var _lChars = 0;                                                                                               //
        var _lEnd = false;                                                                                             //
        var _lByte;                                                                                                    //
        var _lCode = '';                                                                                               //
        for (var _i = 0; _i < this.stringToConvert.length; _i++) {                                                     //
            _lChars = this.stringToConvert.charCodeAt(_i);                                                             //
            this.binaryCode += this.map.getValue(_lChars + '');                                                        //
        }                                                                                                              //
        _lCode = this.binaryCode;                                                                                      //
        while (!_lEnd) {                                                                                               //
            var BytesInfo = { bits: '', finalByte: 0, originalByte: 0 };                                               //
            for (var _j = 0; _j < 8; _j++) {                                                                           //
                _lCodeBytes += _lCode.charAt(_j);                                                                      //
            }                                                                                                          //
            _lByte = parseInt(_lCodeBytes, 2);                                                                         //
            BytesInfo.originalByte = _lByte;                                                                           //
            while (true) {                                                                                             //
                _lByte = this.byteNivelator(_lByte);                                                                   //
                if (_lByte >= 65 && _lByte <= 90) {                                                                    //
                    break;                                                                                             //
                }                                                                                                      //
            }                                                                                                          //
            BytesInfo.finalByte = _lByte;                                                                              //
            BytesInfo.bits = _lCodeBytes;                                                                              //
            this.finalBytes.push(BytesInfo);                                                                           //
            _lCodeBytes = '';                                                                                          //
            _lCode = _lCode.substring(8, _lCode.length);                                                               //
            if (_lCode.length == 0) {                                                                                  //
                _lEnd = true;                                                                                          //
                break;                                                                                                 //
            }                                                                                                          //
            if (_lCode.length < 8) {                                                                                   //
                _lCode = this.addSignificativeBits(_lCode);                                                            //
            }                                                                                                          //
        }                                                                                                              //
    };                                                                                                                 //
    CodeGenerator.prototype.addSignificativeBits = function (_code) {                                                  //
        while (_code.length < 8) {                                                                                     //
            _code += "0";                                                                                              //
            this.significativeBits += 1;                                                                               //
        }                                                                                                              //
        return _code;                                                                                                  //
    };                                                                                                                 //
    CodeGenerator.prototype.byteNivelator = function (_pByte) {                                                        //
        var _lNumberConvert = 0;                                                                                       //
        if (_pByte < 65) {                                                                                             //
            _lNumberConvert = _pByte + 10;                                                                             //
        }                                                                                                              //
        else if (_pByte > 90) {                                                                                        //
            _lNumberConvert = _pByte - 10;                                                                             //
        }                                                                                                              //
        else {                                                                                                         //
            _lNumberConvert = _pByte;                                                                                  //
        }                                                                                                              //
        return _lNumberConvert;                                                                                        //
    };                                                                                                                 //
    CodeGenerator.prototype.createQRCode = function () {                                                               //
        var _lQRCode = '';                                                                                             //
        this.finalBytes.forEach(function (byte) {                                                                      //
            _lQRCode += String.fromCharCode(byte.finalByte);                                                           //
        });                                                                                                            //
        _lQRCode += (this.finalBytes[0].finalByte + '');                                                               //
        _lQRCode += (this.finalBytes[this.finalBytes.length - 1].finalByte + '');                                      //
        this.QRCode = _lQRCode;                                                                                        //
    };                                                                                                                 //
    CodeGenerator.prototype.getFinalBytes = function () {                                                              //
        return this.finalBytes;                                                                                        //
    };                                                                                                                 //
    CodeGenerator.prototype.getSignificativeBits = function () {                                                       //
        return this.significativeBits;                                                                                 //
    };                                                                                                                 //
    CodeGenerator.prototype.getQRCode = function () {                                                                  //
        return this.QRCode;                                                                                            //
    };                                                                                                                 //
    return CodeGenerator;                                                                                              //
}());                                                                                                                  // 226
exports.CodeGenerator = CodeGenerator;                                                                                 // 5
//# sourceMappingURL=codeGenerator.js.map                                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"waiter-queue":{"queues.methods.js":["meteor/meteor","meteor/vsivsi:job-collection","../../../collections/restaurant/restaurant.collection","../../../collections/general/queue.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/restaurant/waiter-queue/queues.methods.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var vsivsi_job_collection_1 = require("meteor/vsivsi:job-collection");                                                 // 3
var restaurant_collection_1 = require("../../../collections/restaurant/restaurant.collection");                        // 9
var queue_collection_1 = require("../../../collections/general/queue.collection");                                     // 11
if (meteor_1.Meteor.isServer) {                                                                                        // 13
    /**                                                                                                                //
     * This function validate if exist queues and creates the instances correspondly                                   //
     */                                                                                                                //
    meteor_1.Meteor.startup(function () {                                                                              //
        var queues = queue_collection_1.Queues.collection.findOne({});                                                 //
        if (queues) {                                                                                                  //
            queues.queues.forEach(function (element) {                                                                 //
                meteor_1.Meteor.call('initProcessJobs', element);                                                      //
            });                                                                                                        //
        }                                                                                                              //
    });                                                                                                                //
    meteor_1.Meteor.methods({                                                                                          //
        /**                                                                                                            //
         * This Meteor Method allow find the queue corresponding to current restaurant of the user                     //
         * @param { any } _data                                                                                        //
         */                                                                                                            //
        findQueueByRestaurant: function (_data) {                                                                      //
            var restaurant = restaurant_collection_1.Restaurants.collection.findOne({ _id: _data.restaurants });       //
            var queue = restaurant.queue;                                                                              //
            var valEmpty = Number.isInteger(restaurant.queue.length);                                                  //
            var queueName = "";                                                                                        //
            if (valEmpty && restaurant.queue.length > 0) {                                                             //
                var position = meteor_1.Meteor.call('getRandomInt', 0, restaurant.queue.length - 1);                   //
                if (restaurant.queue[position] !== "") {                                                               //
                    queueName = "queue" + position;                                                                    //
                    meteor_1.Meteor.call("queueValidate", queueName, function (err, result) {                          //
                        if (err) {                                                                                     //
                            console.log('Error : ' + err);                                                             //
                            throw new Error("Error on Queue validating");                                              //
                        }                                                                                              //
                        else {                                                                                         //
                            meteor_1.Meteor.call('waiterCall', queueName, false, _data);                               //
                        }                                                                                              //
                    });                                                                                                //
                }                                                                                                      //
            }                                                                                                          //
        },                                                                                                             //
        /**                                                                                                            //
         * This Meteor Method validate if exist queue in the collection                                                //
         * @param { string } _queue                                                                                    //
         */                                                                                                            //
        queueValidate: function (_queue) {                                                                             //
            var queueNew = { name: _queue };                                                                           //
            ;                                                                                                          //
            var queues = queue_collection_1.Queues.collection.findOne({});                                             //
            if (queues) {                                                                                              //
                var doc = queue_collection_1.Queues.collection.findOne({ queues: { $elemMatch: { name: _queue } } });  //
                if (!doc) {                                                                                            //
                    queue_collection_1.Queues.update({ _id: queues._id }, { $addToSet: { queues: queueNew }            //
                    });                                                                                                //
                    meteor_1.Meteor.call('initProcessJobs', queueNew);                                                 //
                }                                                                                                      //
            }                                                                                                          //
            else {                                                                                                     //
                queue_collection_1.Queues.insert({                                                                     //
                    queues: [queueNew]                                                                                 //
                });                                                                                                    //
                meteor_1.Meteor.call('initProcessJobs', queueNew);                                                     //
            }                                                                                                          //
        },                                                                                                             //
        /**                                                                                                            //
         * This Meteor Method startup the queue and process jobs                                                       //
         * @param { string } _queue                                                                                    //
         */                                                                                                            //
        initProcessJobs: function (element) {                                                                          //
            var queueCollection = vsivsi_job_collection_1.JobCollection(element.name);                                 //
            queueCollection.startJobServer();                                                                          //
            var workers = queueCollection.processJobs('waiterCall', {                                                  //
                concurrency: 1,                                                                                        //
                payload: 1,                                                                                            //
                pollInterval: 1 * 1000,                                                                                //
                prefetch: 1                                                                                            //
            }, function (job, callback) {                                                                              //
                meteor_1.Meteor.call('processJobs', job, callback, element.name);                                      //
            });                                                                                                        //
        }                                                                                                              //
    });                                                                                                                //
}                                                                                                                      // 100
//# sourceMappingURL=queues.methods.js.map                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"waiter-queue.methods.js":["meteor/meteor","meteor/vsivsi:job-collection","../../../collections/auth/user-detail.collection","../../../collections/restaurant/waiter-call-detail.collection","../../../collections/restaurant/restaurant.collection","../../../collections/restaurant/account.collection","../../../collections/restaurant/order.collection","../../../collections/restaurant/table.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/restaurant/waiter-queue/waiter-queue.methods.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var vsivsi_job_collection_1 = require("meteor/vsivsi:job-collection");                                                 // 2
var user_detail_collection_1 = require("../../../collections/auth/user-detail.collection");                            // 4
var waiter_call_detail_collection_1 = require("../../../collections/restaurant/waiter-call-detail.collection");        // 6
var restaurant_collection_1 = require("../../../collections/restaurant/restaurant.collection");                        // 8
var account_collection_1 = require("../../../collections/restaurant/account.collection");                              // 9
var order_collection_1 = require("../../../collections/restaurant/order.collection");                                  // 10
var table_collection_1 = require("../../../collections/restaurant/table.collection");                                  // 11
//var _queue = JobCollection('waiterCallQueue');                                                                       // 13
if (meteor_1.Meteor.isServer) {                                                                                        // 15
    meteor_1.Meteor.methods({                                                                                          //
        /**                                                                                                            //
         * This Meteor Method add job in the Waiter call queue                                                         //
         * @param {boolean} _priorityHigh                                                                              //
         * @param {any} _data                                                                                          //
         */                                                                                                            //
        waiterCall: function (_queue, _priorityHigh, _data) {                                                          //
            var priority = 'normal';                                                                                   //
            var delay = 0;                                                                                             //
            var waiterCallDetail;                                                                                      //
            var job = new vsivsi_job_collection_1.Job(_queue, 'waiterCall', { data: '' });                             //
            job                                                                                                        //
                .priority(priority)                                                                                    //
                .delay(delay)                                                                                          //
                .save();                                                                                               //
            if (_priorityHigh) {                                                                                       //
                priority = 'critical', delay = 10000;                                                                  //
                waiter_call_detail_collection_1.WaiterCallDetails.update({ job_id: _data.job_id }, { $set: { waiter_id: _data.waiter_id, job_id: job._doc._id } });
                waiterCallDetail = _data.waiter_call_id;                                                               //
            }                                                                                                          //
            else {                                                                                                     //
                var newTurn = meteor_1.Meteor.call('turnCreate', _data);                                               //
                waiterCallDetail = waiter_call_detail_collection_1.WaiterCallDetails.collection.insert({               //
                    restaurant_id: _data.restaurants,                                                                  //
                    table_id: _data.tables,                                                                            //
                    user_id: _data.user,                                                                               //
                    turn: newTurn,                                                                                     //
                    status: _data.status,                                                                              //
                    creation_user: _data.user,                                                                         //
                    creation_date: new Date(),                                                                         //
                    queue: _queue,                                                                                     //
                    job_id: job._doc._id,                                                                              //
                    type: _data.type,                                                                                  //
                    order_id: _data.order_id,                                                                          //
                });                                                                                                    //
            }                                                                                                          //
            return;                                                                                                    //
        },                                                                                                             //
        processJobs: function (job, callback, queueName) {                                                             //
            var data_detail = waiter_call_detail_collection_1.WaiterCallDetails.collection.findOne({ job_id: job._doc._id });
            var restaurant = restaurant_collection_1.Restaurants.collection.findOne({ _id: data_detail.restaurant_id });
            var usr_id_enabled = meteor_1.Meteor.call('validateWaiterEnabled', data_detail.restaurant_id, restaurant.max_jobs, data_detail.table_id);
            if (usr_id_enabled) {                                                                                      //
                vsivsi_job_collection_1.Job.getJob(queueName, job._doc._id, function (err, job) {                      //
                    job.done(function (err, result) { });                                                              //
                    //Storage of turns the restaurants by date                                                         //
                    var toDate = new Date().toLocaleDateString();                                                      //
                    restaurant_collection_1.RestaurantTurns.update({ restaurant_id: data_detail.restaurant_id, creation_date: { $gte: new Date(toDate) } }, { $set: { last_waiter_id: usr_id_enabled.user_id, modification_user: 'SYSTEM', modification_date: new Date(), }
                    });                                                                                                //
                    //Waiter call detail update in completed state                                                     //
                    waiter_call_detail_collection_1.WaiterCallDetails.update({ job_id: job._doc._id }, { $set: { "waiter_id": usr_id_enabled.user_id, "status": "completed" }
                    });                                                                                                //
                });                                                                                                    //
                //Waiter update of current jobs and state                                                              //
                var usr_jobs = usr_id_enabled.jobs + 1;                                                                //
                if (usr_jobs < restaurant.max_jobs) {                                                                  //
                    user_detail_collection_1.UserDetails.update({ user_id: usr_id_enabled.user_id }, { $set: { "jobs": usr_jobs } });
                }                                                                                                      //
                else if (usr_jobs == restaurant.max_jobs) {                                                            //
                    user_detail_collection_1.UserDetails.update({ user_id: usr_id_enabled.user_id }, { $set: { "enabled": false, "jobs": usr_jobs } });
                }                                                                                                      //
            }                                                                                                          //
            else {                                                                                                     //
                vsivsi_job_collection_1.Job.getJob(queueName, job._doc._id, function (err, job) {                      //
                    job.cancel();                                                                                      //
                    var data = {                                                                                       //
                        job_id: job._doc._id,                                                                          //
                        restaurants: data_detail.restaurant_id,                                                        //
                        tables: data_detail.table_id,                                                                  //
                        user: data_detail.user_id,                                                                     //
                        waiter_id: usr_id_enabled,                                                                     //
                        status: 'waiting'                                                                              //
                    };                                                                                                 //
                    job.remove(function (err, result) {                                                                //
                        if (result) {                                                                                  //
                            meteor_1.Meteor.call('waiterCall', queueName, true, data);                                 //
                        }                                                                                              //
                    });                                                                                                //
                });                                                                                                    //
            }                                                                                                          //
            callback();                                                                                                //
        },                                                                                                             //
        /**                                                                                                            //
         * This Meteor method allow get new turn to the client                                                         //
         * @param { any } _data                                                                                        //
         */                                                                                                            //
        turnCreate: function (_data) {                                                                                 //
            var newTurn = 1;                                                                                           //
            var toDate = new Date().toLocaleDateString();                                                              //
            var restaurantTurn = restaurant_collection_1.RestaurantTurns.collection.findOne({                          //
                restaurant_id: _data.restaurants,                                                                      //
                creation_date: { $gte: new Date(toDate) }                                                              //
            });                                                                                                        //
            if (restaurantTurn) {                                                                                      //
                newTurn = restaurantTurn.turn + 1;                                                                     //
                restaurant_collection_1.RestaurantTurns.update({ _id: restaurantTurn._id }, { $set: { turn: newTurn, modification_user: 'SYSTEM', modification_date: new Date(), }
                });                                                                                                    //
            }                                                                                                          //
            else {                                                                                                     //
                restaurant_collection_1.RestaurantTurns.insert({                                                       //
                    restaurant_id: _data.restaurants,                                                                  //
                    turn: newTurn,                                                                                     //
                    last_waiter_id: "",                                                                                //
                    creation_user: 'SYSTEM',                                                                           //
                    creation_date: new Date(),                                                                         //
                });                                                                                                    //
            }                                                                                                          //
            return newTurn;                                                                                            //
        },                                                                                                             //
        /**                                                                                                            //
         * This Meteor Method allow delete a job in the Waiter call queue                                              //
         * @param {string} _waiter_call_detail_id                                                                      //
         * @param {string} _waiter_id                                                                                  //
         */                                                                                                            //
        closeCall: function (_jobDetail, _waiter_id) {                                                                 //
            vsivsi_job_collection_1.Job.getJob(_jobDetail.queue, _jobDetail.job_id, function (err, job) {              //
                job.remove(function (err, result) {                                                                    //
                    waiter_call_detail_collection_1.WaiterCallDetails.update({ job_id: _jobDetail.job_id }, { $set: { "status": "closed", modification_user: _waiter_id, modification_date: new Date() }
                    });                                                                                                //
                    var waiterDetail = waiter_call_detail_collection_1.WaiterCallDetails.collection.findOne({ job_id: _jobDetail.job_id });
                    if (waiterDetail.type === "SEND_ORDER" && waiterDetail.order_id !== null) {                        //
                        order_collection_1.Orders.update({ _id: waiterDetail.order_id }, { $set: { status: 'ORDER_STATUS.DELIVERED',
                                modification_user: this._user,                                                         //
                                modification_date: new Date()                                                          //
                            }                                                                                          //
                        });                                                                                            //
                        var order = order_collection_1.Orders.findOne({ _id: waiterDetail.order_id });                 //
                        if (order) {                                                                                   //
                            var account = account_collection_1.Accounts.findOne({ _id: order.accountId });             //
                            account_collection_1.Accounts.update({ _id: account._id }, { $set: { total_payment: (account.total_payment + order.totalPayment) } });
                        }                                                                                              //
                    }                                                                                                  //
                    var usr_detail = user_detail_collection_1.UserDetails.collection.findOne({ user_id: _waiter_id });
                    var jobs = usr_detail.jobs - 1;                                                                    //
                    user_detail_collection_1.UserDetails.update({ user_id: _waiter_id }, { $set: { "enabled": true, "jobs": jobs } });
                });                                                                                                    //
            });                                                                                                        //
            return;                                                                                                    //
        },                                                                                                             //
        /**                                                                                                            //
         * This meteor method allow cancel call to waiter by the user                                                  //
         * @param {WaiterCallDetail} _jobDetail                                                                        //
         * @param {string} _userId                                                                                     //
         */                                                                                                            //
        cancelCallClient: function (_jobDetail, _userId) {                                                             //
            vsivsi_job_collection_1.Job.getJob(_jobDetail.queue, _jobDetail.job_id, function (err, job) {              //
                if (job._doc.status !== 'completed') {                                                                 //
                    job.cancel();                                                                                      //
                }                                                                                                      //
                job.remove(function (err, result) {                                                                    //
                    waiter_call_detail_collection_1.WaiterCallDetails.update({ job_id: _jobDetail.job_id }, { $set: { "status": "cancel", modification_user: _userId, modification_date: new Date() }
                    });                                                                                                //
                    var waiterDetail = waiter_call_detail_collection_1.WaiterCallDetails.collection.findOne({ job_id: _jobDetail.job_id });
                    if (waiterDetail.type === "CALL_OF_CUSTOMER" && waiterDetail.waiter_id !== '') {                   //
                        var usr_detail = user_detail_collection_1.UserDetails.collection.findOne({ user_id: waiterDetail.waiter_id });
                        var jobs = usr_detail.jobs - 1;                                                                //
                        user_detail_collection_1.UserDetails.update({ user_id: waiterDetail.waiter_id }, { $set: { "enabled": true, "jobs": jobs } });
                    }                                                                                                  //
                });                                                                                                    //
            });                                                                                                        //
        },                                                                                                             //
        /**                                                                                                            //
         * This function validate waiters enabled                                                                      //
         * @param {string} _restaurant                                                                                 //
         * @param {string} _maxJobs                                                                                    //
         */                                                                                                            //
        validateWaiterEnabled: function (_restaurant, _maxJobs, _tableId) {                                            //
            var usr = null;                                                                                            //
            var position = 0;                                                                                          //
            var _randomLast;                                                                                           //
            var table = table_collection_1.Tables.findOne({ _id: _tableId });                                          //
            var waiterEnableds = user_detail_collection_1.UserDetails.collection.find({ restaurant_work: _restaurant,  //
                enabled: true,                                                                                         //
                role_id: "200",                                                                                        //
                jobs: { $lt: _maxJobs },                                                                               //
                table_assignment_init: { $lte: table._number },                                                        //
                table_assignment_end: { $gte: table._number } });                                                      //
            var count = waiterEnableds.count();                                                                        //
            if (count > 0) {                                                                                           //
                var restaurantTurn = restaurant_collection_1.RestaurantTurns.collection.findOne({ "restaurant_id": _restaurant }, {
                    sort: { "creation_date": -1 }                                                                      //
                });                                                                                                    //
                if (restaurantTurn) {                                                                                  //
                    _randomLast = restaurantTurn.last_waiter_id;                                                       //
                }                                                                                                      //
                do {                                                                                                   //
                    position = meteor_1.Meteor.call('getRandomInt', 0, count - 1);                                     //
                    usr = waiterEnableds.fetch()[position];                                                            //
                } while (usr.user_id == _randomLast && count > 1);                                                     //
                return usr;                                                                                            //
            }                                                                                                          //
            else {                                                                                                     //
                return null;                                                                                           //
            }                                                                                                          //
        },                                                                                                             //
        /**                                                                                                            //
        * This function return a random number                                                                         //
        * @param {string} _restaurant                                                                                  //
        */                                                                                                             //
        getRandomInt: function (min, max) {                                                                            //
            return Math.floor(Math.random() * (max - min + 1)) + min;                                                  //
        }                                                                                                              //
    });                                                                                                                //
}                                                                                                                      // 246
//# sourceMappingURL=waiter-queue.methods.js.map                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"invoice.methods.js":["meteor/meteor","/both/collections/restaurant/invoice.collection","/both/collections/restaurant/restaurant.collection","/both/collections/restaurant/table.collection","/both/collections/restaurant/order.collection","/both/collections/administration/item.collection","/both/collections/administration/garnish-food.collection","/both/collections/administration/addition.collection","/both/collections/general/currency.collection","/both/collections/general/paymentMethod.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/restaurant/invoice.methods.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var invoice_collection_1 = require("/both/collections/restaurant/invoice.collection");                                 // 3
var restaurant_collection_1 = require("/both/collections/restaurant/restaurant.collection");                           // 4
var table_collection_1 = require("/both/collections/restaurant/table.collection");                                     // 5
var order_collection_1 = require("/both/collections/restaurant/order.collection");                                     // 6
var item_collection_1 = require("/both/collections/administration/item.collection");                                   // 7
var garnish_food_collection_1 = require("/both/collections/administration/garnish-food.collection");                   // 8
var addition_collection_1 = require("/both/collections/administration/addition.collection");                           // 9
var currency_collection_1 = require("/both/collections/general/currency.collection");                                  // 10
var paymentMethod_collection_1 = require("/both/collections/general/paymentMethod.collection");                        // 11
if (meteor_1.Meteor.isServer) {                                                                                        // 13
    meteor_1.Meteor.methods({                                                                                          //
        /**                                                                                                            //
         * This function allow Invoice generate                                                                        //
         * @param { string } _restaurantId                                                                             //
         */                                                                                                            //
        invoiceGenerating: function (_pPay) {                                                                          //
            var lRestaurant = restaurant_collection_1.Restaurants.findOne({ _id: _pPay.restaurantId });                //
            var lTable = table_collection_1.Tables.findOne({ _id: _pPay.tableId });                                    //
            var lCurrency = currency_collection_1.Currencies.findOne({ _id: lRestaurant.currencyId });                 //
            var lPayMethod = paymentMethod_collection_1.PaymentMethods.findOne({ _id: _pPay.paymentMethodId });        //
            var lInvoiceItems = [];                                                                                    //
            var lInvoiceAdditions = [];                                                                                //
            var lFinantialInformation;                                                                                 //
            _pPay.orders.forEach(function (order) {                                                                    //
                var lOrder = order_collection_1.Orders.findOne({ _id: order });                                        //
                lOrder.items.forEach(function (item) {                                                                 //
                    var lItem = item_collection_1.Items.findOne({ _id: item.itemId });                                 //
                    var lGarnishFood = [];                                                                             //
                    var lAdditions = [];                                                                               //
                    if (item.garnishFood.length > 0) {                                                                 //
                        item.garnishFood.forEach(function (gf) {                                                       //
                            var lgf = garnish_food_collection_1.GarnishFoodCol.findOne({ _id: gf });                   //
                            lGarnishFood.push({ garnish_food_name: lgf.name,                                           //
                                price: lgf.restaurants.filter(function (g) { return g.restaurantId === _pPay.restaurantId; })[0].price });
                        });                                                                                            //
                    }                                                                                                  //
                    if (item.additions.length > 0) {                                                                   //
                        item.additions.forEach(function (ad) {                                                         //
                            var lad = addition_collection_1.Additions.findOne({ _id: ad });                            //
                            lAdditions.push({ addition_name: lad.name,                                                 //
                                price: lad.restaurants.filter(function (a) { return a.restaurantId === _pPay.restaurantId; })[0].price });
                        });                                                                                            //
                    }                                                                                                  //
                    var lInvoiceItem = {                                                                               //
                        item_name: lItem.name,                                                                         //
                        quantity: item.quantity,                                                                       //
                        garnish_food: lGarnishFood,                                                                    //
                        additions: lAdditions,                                                                         //
                        price: lItem.restaurants.filter(function (i) { return i.restaurantId === _pPay.restaurantId; })[0].price,
                    };                                                                                                 //
                    lInvoiceItems.push(lInvoiceItem);                                                                  //
                });                                                                                                    //
                lOrder.additions.forEach(function (addition) {                                                         //
                    var lAddition = addition_collection_1.Additions.findOne({ _id: addition.additionId });             //
                    var lAddAddition = {                                                                               //
                        addition_name: lAddition.name,                                                                 //
                        quantity: addition.quantity,                                                                   //
                        price: lAddition.restaurants.filter(function (a) { return a.restaurantId === _pPay.restaurantId; })[0].price,
                    };                                                                                                 //
                    lInvoiceAdditions.push(lAddAddition);                                                              //
                });                                                                                                    //
            });                                                                                                        //
            lFinantialInformation = {                                                                                  //
                business_name: lRestaurant.financialInformation['BUSINESS_NAME'],                                      //
                nit: lRestaurant.financialInformation['NIT'],                                                          //
                dian_numeration_from: lRestaurant.financialInformation['DIAN_NUMERATION_FROM'],                        //
                dian_numeration_to: lRestaurant.financialInformation['DIAN_NUMERATION_TO'],                            //
                tip_porcentage: lRestaurant.financialInformation['TIP_PERCENTAGE'],                                    //
                address: lRestaurant.address,                                                                          //
                phone: lRestaurant.phone,                                                                              //
            };                                                                                                         //
            invoice_collection_1.Invoices.insert({                                                                     //
                restaurant_name: lRestaurant.name,                                                                     //
                table_number: lTable._number,                                                                          //
                total_pay: _pPay.totalToPayment,                                                                       //
                total_order: _pPay.totalOrdersPrice,                                                                   //
                total_tip: _pPay.totalTip,                                                                             //
                customer_id: _pPay.userId,                                                                             //
                currency: lCurrency.code,                                                                              //
                pay_method: lPayMethod.name,                                                                           //
                items: lInvoiceItems,                                                                                  //
                additions: lInvoiceAdditions,                                                                          //
                financial_information: lFinantialInformation,                                                          //
                creation_user: meteor_1.Meteor.userId(),                                                               //
                creation_date: new Date()                                                                              //
            });                                                                                                        //
        }                                                                                                              //
    });                                                                                                                //
}                                                                                                                      // 99
//# sourceMappingURL=invoice.methods.js.map                                                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"order.methods.js":["meteor/meteor","/both/collections/restaurant/table.collection","/both/collections/restaurant/account.collection","/both/collections/restaurant/order.collection","/both/collections/restaurant/restaurant.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/restaurant/order.methods.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var table_collection_1 = require("/both/collections/restaurant/table.collection");                                     // 3
var account_collection_1 = require("/both/collections/restaurant/account.collection");                                 // 5
var order_collection_1 = require("/both/collections/restaurant/order.collection");                                     // 7
var restaurant_collection_1 = require("/both/collections/restaurant/restaurant.collection");                           // 9
if (meteor_1.Meteor.isServer) {                                                                                        // 11
    meteor_1.Meteor.methods({                                                                                          //
        /**                                                                                                            //
         * This Meteor Method add item in user order                                                                   //
         * @param {OrderItem} _itemToInsert                                                                            //
         * @param {string} _tableQRCode                                                                                //
         */                                                                                                            //
        AddItemToOrder: function (_itemToInsert, _restaurantId, _tableQRCode, _finalPrice) {                           //
            var _lTable = table_collection_1.Tables.collection.findOne({ QR_code: _tableQRCode });                     //
            var _lAccount = account_collection_1.Accounts.collection.findOne({                                         //
                restaurantId: _restaurantId,                                                                           //
                tableId: _lTable._id,                                                                                  //
                status: 'OPEN'                                                                                         //
            });                                                                                                        //
            var _lOrder = order_collection_1.Orders.collection.findOne({                                               //
                creation_user: meteor_1.Meteor.userId(),                                                               //
                restaurantId: _restaurantId,                                                                           //
                tableId: _lTable._id,                                                                                  //
                accountId: _lAccount._id,                                                                              //
                status: 'ORDER_STATUS.REGISTERED',                                                                     //
                toPay: false                                                                                           //
            });                                                                                                        //
            if (_lOrder) {                                                                                             //
                var _lTotalPaymentAux = Number.parseInt(_lOrder.totalPayment.toString()) + Number.parseInt(_itemToInsert.paymentItem.toString());
                order_collection_1.Orders.update({                                                                     //
                    creation_user: meteor_1.Meteor.userId(),                                                           //
                    restaurantId: _restaurantId,                                                                       //
                    tableId: _lTable._id,                                                                              //
                    accountId: _lAccount._id,                                                                          //
                    status: 'ORDER_STATUS.REGISTERED'                                                                  //
                }, { $push: { items: _itemToInsert } });                                                               //
                order_collection_1.Orders.update({                                                                     //
                    creation_user: meteor_1.Meteor.userId(),                                                           //
                    restaurantId: _restaurantId,                                                                       //
                    tableId: _lTable._id,                                                                              //
                    accountId: _lAccount._id,                                                                          //
                    status: 'ORDER_STATUS.REGISTERED'                                                                  //
                }, {                                                                                                   //
                    $set: {                                                                                            //
                        modification_user: meteor_1.Meteor.userId(),                                                   //
                        modification_date: new Date(),                                                                 //
                        totalPayment: _lTotalPaymentAux,                                                               //
                        orderItemCount: _lOrder.orderItemCount + 1                                                     //
                    }                                                                                                  //
                });                                                                                                    //
            }                                                                                                          //
            else {                                                                                                     //
                var _lRestaurant = restaurant_collection_1.Restaurants.collection.findOne({ _id: _restaurantId });     //
                var _orderCount = _lRestaurant.orderNumberCount + 1;                                                   //
                _lRestaurant.orderNumberCount = _orderCount;                                                           //
                restaurant_collection_1.Restaurants.update({ _id: _lRestaurant._id }, _lRestaurant);                   //
                order_collection_1.Orders.insert({                                                                     //
                    creation_user: meteor_1.Meteor.userId(),                                                           //
                    creation_date: new Date(),                                                                         //
                    restaurantId: _restaurantId,                                                                       //
                    tableId: _lTable._id,                                                                              //
                    code: _orderCount,                                                                                 //
                    status: 'ORDER_STATUS.REGISTERED',                                                                 //
                    accountId: _lAccount._id,                                                                          //
                    items: [_itemToInsert],                                                                            //
                    totalPayment: _finalPrice,                                                                         //
                    orderItemCount: 1,                                                                                 //
                    translateInfo: {                                                                                   //
                        firstOrderOwner: meteor_1.Meteor.userId(),                                                     //
                        markedToTranslate: false,                                                                      //
                        lastOrderOwner: '',                                                                            //
                        confirmedToTranslate: false                                                                    //
                    },                                                                                                 //
                    toPay: false,                                                                                      //
                    additions: []                                                                                      //
                });                                                                                                    //
            }                                                                                                          //
        },                                                                                                             //
        AddItemToOrder2: function (_itemToInsert, _restaurantId, _idTable, _finalPrice) {                              //
            var _lTable = table_collection_1.Tables.collection.findOne({ _id: _idTable });                             //
            var _lAccount = account_collection_1.Accounts.collection.findOne({                                         //
                restaurantId: _restaurantId,                                                                           //
                tableId: _lTable._id,                                                                                  //
                status: 'OPEN'                                                                                         //
            });                                                                                                        //
            var _lOrder = order_collection_1.Orders.collection.findOne({                                               //
                creation_user: meteor_1.Meteor.userId(),                                                               //
                restaurantId: _restaurantId,                                                                           //
                tableId: _lTable._id,                                                                                  //
                accountId: _lAccount._id,                                                                              //
                status: 'ORDER_STATUS.REGISTERED',                                                                     //
                toPay: false                                                                                           //
            });                                                                                                        //
            if (_lOrder) {                                                                                             //
                var _lTotalPaymentAux = Number.parseInt(_lOrder.totalPayment.toString()) + Number.parseInt(_itemToInsert.paymentItem.toString());
                order_collection_1.Orders.update({                                                                     //
                    creation_user: meteor_1.Meteor.userId(),                                                           //
                    restaurantId: _restaurantId,                                                                       //
                    tableId: _lTable._id,                                                                              //
                    accountId: _lAccount._id,                                                                          //
                    status: 'ORDER_STATUS.REGISTERED'                                                                  //
                }, { $push: { items: _itemToInsert } });                                                               //
                order_collection_1.Orders.update({                                                                     //
                    creation_user: meteor_1.Meteor.userId(),                                                           //
                    restaurantId: _restaurantId,                                                                       //
                    tableId: _lTable._id,                                                                              //
                    accountId: _lAccount._id,                                                                          //
                    status: 'ORDER_STATUS.REGISTERED'                                                                  //
                }, {                                                                                                   //
                    $set: {                                                                                            //
                        modification_user: meteor_1.Meteor.userId(),                                                   //
                        modification_date: new Date(),                                                                 //
                        totalPayment: _lTotalPaymentAux,                                                               //
                        orderItemCount: _lOrder.orderItemCount + 1                                                     //
                    }                                                                                                  //
                });                                                                                                    //
            }                                                                                                          //
            else {                                                                                                     //
                var _lRestaurant = restaurant_collection_1.Restaurants.collection.findOne({ _id: _restaurantId });     //
                var _orderCount = _lRestaurant.orderNumberCount + 1;                                                   //
                _lRestaurant.orderNumberCount = _orderCount;                                                           //
                restaurant_collection_1.Restaurants.update({ _id: _lRestaurant._id }, _lRestaurant);                   //
                order_collection_1.Orders.insert({                                                                     //
                    creation_user: meteor_1.Meteor.userId(),                                                           //
                    creation_date: new Date(),                                                                         //
                    restaurantId: _restaurantId,                                                                       //
                    tableId: _lTable._id,                                                                              //
                    code: _orderCount,                                                                                 //
                    status: 'ORDER_STATUS.REGISTERED',                                                                 //
                    accountId: _lAccount._id,                                                                          //
                    items: [_itemToInsert],                                                                            //
                    totalPayment: _finalPrice,                                                                         //
                    orderItemCount: 1,                                                                                 //
                    translateInfo: {                                                                                   //
                        firstOrderOwner: meteor_1.Meteor.userId(),                                                     //
                        markedToTranslate: false,                                                                      //
                        lastOrderOwner: '',                                                                            //
                        confirmedToTranslate: false                                                                    //
                    },                                                                                                 //
                    toPay: false,                                                                                      //
                    additions: []                                                                                      //
                });                                                                                                    //
            }                                                                                                          //
        },                                                                                                             //
        /**                                                                                                            //
         * This Meteor Method Add Additions to order                                                                   //
         * @param {OrderAddition[]} _additionsToInsert                                                                 //
         * @param {string} _restaurantId                                                                               //
         * @param {string} _tableQRCode                                                                                //
         * @param {number} _AdditionsPrice                                                                             //
         */                                                                                                            //
        AddAdditionsToOrder: function (_additionsToInsert, _restaurantId, _tableQRCode, _AdditionsPrice) {             //
            var _lTable = table_collection_1.Tables.collection.findOne({ QR_code: _tableQRCode });                     //
            var _lAccount = account_collection_1.Accounts.collection.findOne({                                         //
                restaurantId: _restaurantId,                                                                           //
                tableId: _lTable._id,                                                                                  //
                status: 'OPEN'                                                                                         //
            });                                                                                                        //
            var _lOrder = order_collection_1.Orders.collection.findOne({                                               //
                creation_user: meteor_1.Meteor.userId(),                                                               //
                restaurantId: _restaurantId,                                                                           //
                tableId: _lTable._id,                                                                                  //
                accountId: _lAccount._id,                                                                              //
                status: 'ORDER_STATUS.REGISTERED',                                                                     //
                toPay: false                                                                                           //
            });                                                                                                        //
            if (_lOrder) {                                                                                             //
                var _lTotalPaymentAux = Number.parseInt(_lOrder.totalPayment.toString()) + Number.parseInt(_AdditionsPrice.toString());
                var _lAdditions = meteor_1.Meteor.call('compareAdditionsToInsert', _additionsToInsert, _lOrder);       //
                order_collection_1.Orders.update({                                                                     //
                    creation_user: meteor_1.Meteor.userId(),                                                           //
                    restaurantId: _restaurantId,                                                                       //
                    tableId: _lTable._id,                                                                              //
                    accountId: _lAccount._id,                                                                          //
                    status: 'ORDER_STATUS.REGISTERED'                                                                  //
                }, {                                                                                                   //
                    $set: {                                                                                            //
                        modification_user: meteor_1.Meteor.userId(),                                                   //
                        modification_date: new Date(),                                                                 //
                        totalPayment: _lTotalPaymentAux,                                                               //
                        additions: _lAdditions                                                                         //
                    }                                                                                                  //
                });                                                                                                    //
            }                                                                                                          //
            else {                                                                                                     //
                var _lRestaurant = restaurant_collection_1.Restaurants.collection.findOne({ _id: _restaurantId });     //
                var _orderCount = _lRestaurant.orderNumberCount + 1;                                                   //
                _lRestaurant.orderNumberCount = _orderCount;                                                           //
                restaurant_collection_1.Restaurants.update({ _id: _lRestaurant._id }, _lRestaurant);                   //
                order_collection_1.Orders.insert({                                                                     //
                    creation_user: meteor_1.Meteor.userId(),                                                           //
                    creation_date: new Date(),                                                                         //
                    restaurantId: _restaurantId,                                                                       //
                    tableId: _lTable._id,                                                                              //
                    code: _orderCount,                                                                                 //
                    status: 'ORDER_STATUS.REGISTERED',                                                                 //
                    accountId: _lAccount._id,                                                                          //
                    items: [],                                                                                         //
                    totalPayment: _AdditionsPrice,                                                                     //
                    orderItemCount: 0,                                                                                 //
                    translateInfo: {                                                                                   //
                        firstOrderOwner: meteor_1.Meteor.userId(),                                                     //
                        markedToTranslate: false,                                                                      //
                        lastOrderOwner: '',                                                                            //
                        confirmedToTranslate: false                                                                    //
                    },                                                                                                 //
                    toPay: false,                                                                                      //
                    additions: _additionsToInsert                                                                      //
                });                                                                                                    //
            }                                                                                                          //
        },                                                                                                             //
        AddAdditionsToOrder2: function (_additionsToInsert, _restaurantId, _tableId, _AdditionsPrice) {                //
            var _lTable = table_collection_1.Tables.collection.findOne({ _id: _tableId });                             //
            var _lAccount = account_collection_1.Accounts.collection.findOne({                                         //
                restaurantId: _restaurantId,                                                                           //
                tableId: _lTable._id,                                                                                  //
                status: 'OPEN'                                                                                         //
            });                                                                                                        //
            var _lOrder = order_collection_1.Orders.collection.findOne({                                               //
                creation_user: meteor_1.Meteor.userId(),                                                               //
                restaurantId: _restaurantId,                                                                           //
                tableId: _lTable._id,                                                                                  //
                accountId: _lAccount._id,                                                                              //
                status: 'ORDER_STATUS.REGISTERED',                                                                     //
                toPay: false                                                                                           //
            });                                                                                                        //
            if (_lOrder) {                                                                                             //
                var _lTotalPaymentAux = Number.parseInt(_lOrder.totalPayment.toString()) + Number.parseInt(_AdditionsPrice.toString());
                var _lAdditions = meteor_1.Meteor.call('compareAdditionsToInsert', _additionsToInsert, _lOrder);       //
                order_collection_1.Orders.update({                                                                     //
                    creation_user: meteor_1.Meteor.userId(),                                                           //
                    restaurantId: _restaurantId,                                                                       //
                    tableId: _lTable._id,                                                                              //
                    accountId: _lAccount._id,                                                                          //
                    status: 'ORDER_STATUS.REGISTERED'                                                                  //
                }, {                                                                                                   //
                    $set: {                                                                                            //
                        modification_user: meteor_1.Meteor.userId(),                                                   //
                        modification_date: new Date(),                                                                 //
                        totalPayment: _lTotalPaymentAux,                                                               //
                        additions: _lAdditions                                                                         //
                    }                                                                                                  //
                });                                                                                                    //
            }                                                                                                          //
            else {                                                                                                     //
                var _lRestaurant = restaurant_collection_1.Restaurants.collection.findOne({ _id: _restaurantId });     //
                var _orderCount = _lRestaurant.orderNumberCount + 1;                                                   //
                _lRestaurant.orderNumberCount = _orderCount;                                                           //
                restaurant_collection_1.Restaurants.update({ _id: _lRestaurant._id }, _lRestaurant);                   //
                order_collection_1.Orders.insert({                                                                     //
                    creation_user: meteor_1.Meteor.userId(),                                                           //
                    creation_date: new Date(),                                                                         //
                    restaurantId: _restaurantId,                                                                       //
                    tableId: _lTable._id,                                                                              //
                    code: _orderCount,                                                                                 //
                    status: 'ORDER_STATUS.REGISTERED',                                                                 //
                    accountId: _lAccount._id,                                                                          //
                    items: [],                                                                                         //
                    totalPayment: _AdditionsPrice,                                                                     //
                    orderItemCount: 0,                                                                                 //
                    translateInfo: {                                                                                   //
                        firstOrderOwner: meteor_1.Meteor.userId(),                                                     //
                        markedToTranslate: false,                                                                      //
                        lastOrderOwner: '',                                                                            //
                        confirmedToTranslate: false                                                                    //
                    },                                                                                                 //
                    toPay: false,                                                                                      //
                    additions: _additionsToInsert                                                                      //
                });                                                                                                    //
            }                                                                                                          //
        },                                                                                                             //
        /**                                                                                                            //
         * This function compare additions to insert and create new array                                              //
         * @param {OrderAddition[]} _pAdditionsToInsert                                                                //
         */                                                                                                            //
        compareAdditionsToInsert: function (_pAdditionsToInsert, _pOrder) {                                            //
            var _lAdditionsToReturn = _pOrder.additions;                                                               //
            _pAdditionsToInsert.forEach(function (addToInsert) {                                                       //
                _lAdditionsToReturn.forEach(function (addToReturn) {                                                   //
                    if (addToInsert.additionId === addToReturn.additionId) {                                           //
                        addToReturn.quantity = addToReturn.quantity + addToInsert.quantity;                            //
                        addToReturn.paymentAddition = addToReturn.paymentAddition + addToInsert.paymentAddition;       //
                    }                                                                                                  //
                });                                                                                                    //
            });                                                                                                        //
            _pAdditionsToInsert.forEach(function (addToInsert) {                                                       //
                if (_lAdditionsToReturn.filter(function (ad) { return ad.additionId === addToInsert.additionId; }).length === 0) {
                    _lAdditionsToReturn.push(addToInsert);                                                             //
                }                                                                                                      //
            });                                                                                                        //
            return _lAdditionsToReturn;                                                                                //
        }                                                                                                              //
    });                                                                                                                //
}                                                                                                                      // 326
//# sourceMappingURL=order.methods.js.map                                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"payment.methods.js":["meteor/meteor","/both/collections/restaurant/account.collection","/both/collections/restaurant/order.collection","/both/collections/restaurant/payment.collection","/both/collections/restaurant/table.collection","/both/collections/auth/user-detail.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/restaurant/payment.methods.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var account_collection_1 = require("/both/collections/restaurant/account.collection");                                 // 2
var order_collection_1 = require("/both/collections/restaurant/order.collection");                                     // 3
var payment_collection_1 = require("/both/collections/restaurant/payment.collection");                                 // 4
var table_collection_1 = require("/both/collections/restaurant/table.collection");                                     // 5
var user_detail_collection_1 = require("/both/collections/auth/user-detail.collection");                               // 6
if (meteor_1.Meteor.isServer) {                                                                                        // 9
    meteor_1.Meteor.methods({                                                                                          //
        /**                                                                                                            //
         * This method allow to payment of the account according to the restaurant and table                           //
         * @param { string } _restaurantId                                                                             //
         * @param { string } _tableId                                                                                  //
         */                                                                                                            //
        closePay: function (_restaurantId, _tableId, _call) {                                                          //
            var _paymentsToPay;                                                                                        //
            var _paymentsNotReceived = 0;                                                                              //
            var _countOrders = 0;                                                                                      //
            _paymentsToPay = payment_collection_1.Payments.collection.find({ restaurantId: _restaurantId, tableId: _tableId, status: 'PAYMENT.NO_PAID', received: true });
            _paymentsNotReceived = payment_collection_1.Payments.collection.find({ restaurantId: _restaurantId, tableId: _tableId, status: 'PAYMENT.NO_PAID', received: false }).count();
            _paymentsToPay.fetch().forEach(function (pay) {                                                            //
                pay.orders.forEach(function (order) {                                                                  //
                    order_collection_1.Orders.update({ _id: order }, { $set: { status: 'ORDER_STATUS.CLOSED' } });     //
                });                                                                                                    //
                payment_collection_1.Payments.update({ _id: pay._id }, { $set: { status: 'PAYMENT.PAID' } });          //
                var orderOwner = order_collection_1.Orders.collection.find({ creation_user: pay.creation_user, status: { $in: ['ORDER_STATUS.REGISTERED', 'ORDER_STATUS.IN_PROCESS', 'ORDER_STATUS.PREPARED', 'ORDER_STATUS.DELIVERED', 'ORDER_STATUS.PENDING_CONFIRM'] } }).count();
                if (orderOwner === 0) {                                                                                //
                    user_detail_collection_1.UserDetails.update({ user_id: pay.creation_user }, { $set: { current_restaurant: '', current_table: '' } });
                    var currentTable = table_collection_1.Tables.findOne({ _id: _tableId });                           //
                    table_collection_1.Tables.update({ _id: _tableId }, { $set: { amount_people: (currentTable.amount_people - 1) } });
                }                                                                                                      //
                var accountTable = account_collection_1.Accounts.collection.findOne({ tableId: _tableId, status: 'OPEN' });
                account_collection_1.Accounts.update({ _id: accountTable._id }, { $set: { total_payment: (accountTable.total_payment - pay.totalOrdersPrice) } });
                //Invoice generate                                                                                     //
                meteor_1.Meteor.call('invoiceGenerating', pay);                                                        //
            });                                                                                                        //
            _countOrders = order_collection_1.Orders.collection.find({ restaurantId: _restaurantId, tableId: _tableId, status: { $in: ['ORDER_STATUS.REGISTERED', 'ORDER_STATUS.IN_PROCESS', 'ORDER_STATUS.PREPARED', 'ORDER_STATUS.DELIVERED', 'ORDER_STATUS.PENDING_CONFIRM'] } }).count();
            var accountTable = account_collection_1.Accounts.collection.findOne({ tableId: _tableId, status: 'OPEN' });
            if (_countOrders === 0 && accountTable.total_payment === 0) {                                              //
                account_collection_1.Accounts.update({ _id: accountTable._id }, { $set: { status: 'CLOSED' } });       //
                table_collection_1.Tables.update({ _id: _tableId }, { $set: { status: 'FREE', amount_people: 0 } });   //
            }                                                                                                          //
            if (_paymentsNotReceived === 0) {                                                                          //
                meteor_1.Meteor.call('closeCall', _call, meteor_1.Meteor.userId());                                    //
            }                                                                                                          //
        }                                                                                                              //
    });                                                                                                                //
}                                                                                                                      // 59
//# sourceMappingURL=payment.methods.js.map                                                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"restaurant.methods.js":["meteor/meteor","meteor/jalik:ufs","../../stores/restaurant/restaurant.store","./QR/codeGenerator","../../collections/restaurant/table.collection","../../collections/auth/user-detail.collection","../../collections/restaurant/account.collection","../../collections/restaurant/restaurant.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/restaurant/restaurant.methods.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var jalik_ufs_1 = require("meteor/jalik:ufs");                                                                         // 2
var restaurant_store_1 = require("../../stores/restaurant/restaurant.store");                                          // 3
var codeGenerator_1 = require("./QR/codeGenerator");                                                                   // 4
var table_collection_1 = require("../../collections/restaurant/table.collection");                                     // 6
var user_detail_collection_1 = require("../../collections/auth/user-detail.collection");                               // 7
var account_collection_1 = require("../../collections/restaurant/account.collection");                                 // 8
var restaurant_collection_1 = require("../../collections/restaurant/restaurant.collection");                           // 10
/**                                                                                                                    // 14
 * Function allow upload restaurant images                                                                             //
 * @param {File} data                                                                                                  //
 * @param {string} user                                                                                                //
 * @return {Promise<any>} uploadRestaurantImage                                                                        //
 */                                                                                                                    //
function uploadRestaurantImage(data, user, restaurantId) {                                                             // 20
    return new Promise(function (resolve, reject) {                                                                    //
        var file = {                                                                                                   //
            name: data.name,                                                                                           //
            type: data.type,                                                                                           //
            size: data.size,                                                                                           //
            userId: user,                                                                                              //
            restaurantId: restaurantId                                                                                 //
        };                                                                                                             //
        var upload = new jalik_ufs_1.UploadFS.Uploader({                                                               //
            data: data,                                                                                                //
            file: file,                                                                                                //
            store: restaurant_store_1.RestaurantImagesStore,                                                           //
            onError: reject,                                                                                           //
            onComplete: resolve                                                                                        //
        });                                                                                                            //
        upload.start();                                                                                                //
    });                                                                                                                //
}                                                                                                                      // 41
exports.uploadRestaurantImage = uploadRestaurantImage;                                                                 // 20
/**                                                                                                                    // 43
 * This function create random code with 9 length to restaurants                                                       //
 */                                                                                                                    //
function createRestaurantCode() {                                                                                      // 46
    var _lText = '';                                                                                                   //
    var _lPossible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';                                                                     //
    for (var _i = 0; _i < 9; _i++) {                                                                                   //
        _lText += _lPossible.charAt(Math.floor(Math.random() * _lPossible.length));                                    //
    }                                                                                                                  //
    return _lText;                                                                                                     //
}                                                                                                                      // 54
exports.createRestaurantCode = createRestaurantCode;                                                                   // 46
/**                                                                                                                    // 56
 * This function create random code with 5 length to restaurants                                                       //
 */                                                                                                                    //
function createTableCode() {                                                                                           // 59
    var _lText = '';                                                                                                   //
    var _lPossible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';                                                                     //
    for (var _i = 0; _i < 5; _i++) {                                                                                   //
        _lText += _lPossible.charAt(Math.floor(Math.random() * _lPossible.length));                                    //
    }                                                                                                                  //
    return _lText;                                                                                                     //
}                                                                                                                      // 67
exports.createTableCode = createTableCode;                                                                             // 59
/**                                                                                                                    // 69
 * This function create QR Codes to restaurants                                                                        //
 * @param {string} _pRestaurantId                                                                                      //
 * @param {string} _pTableCode                                                                                         //
 * @param {string} _pStringToCode                                                                                      //
 * @return {Table} generateQRCode                                                                                      //
 */                                                                                                                    //
function generateQRCode(_pStringToCode) {                                                                              // 76
    var _lCodeGenerator = new codeGenerator_1.CodeGenerator(_pStringToCode);                                           //
    _lCodeGenerator.generateCode();                                                                                    //
    return _lCodeGenerator;                                                                                            //
}                                                                                                                      // 80
exports.generateQRCode = generateQRCode;                                                                               // 76
meteor_1.Meteor.methods({                                                                                              // 82
    /**                                                                                                                //
     * This Meteor Method return restaurant object with QR Code condition                                              //
     * @param {string} _qrcode                                                                                         //
     * @param {string} _userId                                                                                         //
     */                                                                                                                //
    getRestaurantByQRCode: function (_qrcode, _userId) {                                                               //
        var _table = table_collection_1.Tables.collection.findOne({ QR_code: _qrcode });                               //
        var _restaurant;                                                                                               //
        if (_table) {                                                                                                  //
            _restaurant = restaurant_collection_1.Restaurants.collection.findOne({ _id: _table.restaurantId });        //
            if (_restaurant.isActive) {                                                                                //
                if (_table.status === 'BUSY') {                                                                        //
                    user_detail_collection_1.UserDetails.collection.update({ user_id: _userId }, {                     //
                        $set: {                                                                                        //
                            current_table: _table._id,                                                                 //
                            current_restaurant: _table.restaurantId                                                    //
                        }                                                                                              //
                    });                                                                                                //
                    table_collection_1.Tables.collection.update({ QR_code: _qrcode }, { $set: { amount_people: (_table.amount_people + 1) } });
                }                                                                                                      //
                else if (_table.status === 'FREE') {                                                                   //
                    table_collection_1.Tables.collection.update({ QR_code: _qrcode }, { $set: { status: 'BUSY', amount_people: 1 } });
                    account_collection_1.Accounts.collection.insert({                                                  //
                        creation_date: new Date(),                                                                     //
                        creation_user: _userId,                                                                        //
                        restaurantId: _table.restaurantId,                                                             //
                        tableId: _table._id,                                                                           //
                        status: 'OPEN',                                                                                //
                        total_payment: 0                                                                               //
                    });                                                                                                //
                    user_detail_collection_1.UserDetails.collection.update({ user_id: _userId }, {                     //
                        $set: {                                                                                        //
                            current_table: _table._id,                                                                 //
                            current_restaurant: _table.restaurantId                                                    //
                        }                                                                                              //
                    });                                                                                                //
                }                                                                                                      //
                return _restaurant;                                                                                    //
            }                                                                                                          //
            else {                                                                                                     //
                throw new meteor_1.Meteor.Error('200');                                                                //
            }                                                                                                          //
        }                                                                                                              //
        else {                                                                                                         //
            throw new meteor_1.Meteor.Error('400');                                                                    //
        }                                                                                                              //
    },                                                                                                                 //
    /**                                                                                                                //
     * This method return restaurant if exist o null if not                                                            //
     */                                                                                                                //
    getCurrentRestaurantByUser: function (_restaurantId) {                                                             //
        var restaurant = restaurant_collection_1.Restaurants.collection.findOne({ _id: _restaurantId });               //
        if (typeof restaurant != "undefined" || restaurant != null) {                                                  //
            return restaurant;                                                                                         //
        }                                                                                                              //
        else {                                                                                                         //
            return null;                                                                                               //
        }                                                                                                              //
    }                                                                                                                  //
});                                                                                                                    //
//# sourceMappingURL=restaurant.methods.js.map                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"schedule.methods.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/restaurant/schedule.methods.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
if (Meteor.isServer) {                                                                                                 // 4
    /**                                                                                                                //
    * Init the cron according to the countries registered                                                              //
    */                                                                                                                 //
    /*                                                                                                                 //
    Meteor.startup(function () {                                                                                       //
        let activeCountries = Countries.collection.find({is_active: true}).fetch();                                    //
        activeCountries.forEach(country => {                                                                           //
            console.log(country._id);                                                                                  //
        });                                                                                                            //
    });                                                                                                                //
    */                                                                                                                 //
    Meteor.methods({});                                                                                                //
}                                                                                                                      // 24
//# sourceMappingURL=schedule.methods.js.map                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"table.method.js":["meteor/meteor","/both/collections/restaurant/table.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/restaurant/table.method.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var table_collection_1 = require("/both/collections/restaurant/table.collection");                                     // 3
meteor_1.Meteor.methods({                                                                                              // 5
    getCurrentTableByUser: function (_idTable) {                                                                       //
        var table = table_collection_1.Tables.collection.findOne({ _id: _idTable });                                   //
        if (typeof table != "undefined" || table != null) {                                                            //
            return table;                                                                                              //
        }                                                                                                              //
        else {                                                                                                         //
            return null;                                                                                               //
        }                                                                                                              //
    },                                                                                                                 //
    getIdTableByQr: function (_qrCode) {                                                                               //
        var table = table_collection_1.Tables.collection.findOne({ QR_code: _qrCode });                                //
        if (typeof table != "undefined" || table != null) {                                                            //
            return table._id;                                                                                          //
        }                                                                                                              //
        else {                                                                                                         //
            return null;                                                                                               //
        }                                                                                                              //
    }                                                                                                                  //
});                                                                                                                    //
//# sourceMappingURL=table.method.js.map                                                                               //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"administration":{"collaborators.methods.js":["meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/administration/collaborators.methods.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
if (meteor_1.Meteor.isServer) {                                                                                        // 4
    meteor_1.Meteor.methods({                                                                                          //
        createCollaboratorUser: function (_info) {                                                                     //
            var result = Accounts.createUser({                                                                         //
                email: _info.email,                                                                                    //
                password: _info.password,                                                                              //
                username: _info.username,                                                                              //
                profile: _info.profile,                                                                                //
            });                                                                                                        //
            return result;                                                                                             //
        }                                                                                                              //
    });                                                                                                                //
}                                                                                                                      // 17
//# sourceMappingURL=collaborators.methods.js.map                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"item.methods.js":["meteor/meteor","meteor/jalik:ufs","/both/collections/administration/item.collection","../../stores/administration/item.store",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/administration/item.methods.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var jalik_ufs_1 = require("meteor/jalik:ufs");                                                                         // 2
var item_collection_1 = require("/both/collections/administration/item.collection");                                   // 3
var item_store_1 = require("../../stores/administration/item.store");                                                  // 4
/**                                                                                                                    // 8
 * Function allow upload item images                                                                                   //
 * @param {File} data                                                                                                  //
 * @param {String} user                                                                                                //
 * @return {Promise<any>} uploadItemImage                                                                              //
 */                                                                                                                    //
function uploadItemImage(data, user, itemId) {                                                                         // 14
    return new Promise(function (resolve, reject) {                                                                    //
        var file = {                                                                                                   //
            name: data.name,                                                                                           //
            type: data.type,                                                                                           //
            size: data.size,                                                                                           //
            userId: user,                                                                                              //
            itemId: itemId                                                                                             //
        };                                                                                                             //
        var upload = new jalik_ufs_1.UploadFS.Uploader({                                                               //
            data: data,                                                                                                //
            file: file,                                                                                                //
            store: item_store_1.ItemImagesStore,                                                                       //
            onError: reject,                                                                                           //
            onComplete: resolve                                                                                        //
        });                                                                                                            //
        upload.start();                                                                                                //
    });                                                                                                                //
}                                                                                                                      // 35
exports.uploadItemImage = uploadItemImage;                                                                             // 14
if (meteor_1.Meteor.isServer) {                                                                                        // 38
    meteor_1.Meteor.methods({                                                                                          //
        /**                                                                                                            //
         * Function to update item available for supervisor                                                            //
         * @param {UserDetail} _userDetail                                                                             //
         * @param {Item} _item                                                                                         //
         */                                                                                                            //
        updateItemAvailable: function (_restaurantId, _itemId) {                                                       //
            var _itemRestaurant = item_collection_1.Items.collection.findOne({ _id: _itemId }, { fields: { _id: 0, restaurants: 1 } });
            var aux = _itemRestaurant.restaurants.find(function (element) { return element.restaurantId === _restaurantId; });
            item_collection_1.Items.update({ _id: _itemId, "restaurants.restaurantId": _restaurantId }, { $set: { 'restaurants.$.isAvailable': !aux.isAvailable, modification_date: new Date(), modification_user: meteor_1.Meteor.userId() } });
        }                                                                                                              //
    });                                                                                                                //
}                                                                                                                      // 51
//# sourceMappingURL=item.methods.js.map                                                                               //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"promotion.methods.js":["meteor/jalik:ufs","../../stores/administration/promotion.store",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/administration/promotion.methods.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var jalik_ufs_1 = require("meteor/jalik:ufs");                                                                         // 2
var promotion_store_1 = require("../../stores/administration/promotion.store");                                        // 4
/**                                                                                                                    // 6
 * Function allow upload promotion images                                                                              //
 * @param {File} data                                                                                                  //
 * @param {String} user                                                                                                //
 * @return {Promise<any>} uploadGarnishFoodImage                                                                       //
 */                                                                                                                    //
function uploadPromotionImage(data, user, promotionId) {                                                               // 12
    return new Promise(function (resolve, reject) {                                                                    //
        var file = {                                                                                                   //
            name: data.name,                                                                                           //
            type: data.type,                                                                                           //
            size: data.size,                                                                                           //
            userId: user,                                                                                              //
            promotionId: promotionId                                                                                   //
        };                                                                                                             //
        var upload = new jalik_ufs_1.UploadFS.Uploader({                                                               //
            data: data,                                                                                                //
            file: file,                                                                                                //
            store: promotion_store_1.PromotionImagesStore,                                                             //
            onError: reject,                                                                                           //
            onComplete: resolve                                                                                        //
        });                                                                                                            //
        upload.start();                                                                                                //
    });                                                                                                                //
}                                                                                                                      // 33
exports.uploadPromotionImage = uploadPromotionImage;                                                                   // 12
//# sourceMappingURL=promotion.methods.js.map                                                                          //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"auth":{"menu.methods.js":["meteor/meteor","/both/collections/auth/role.collection","/both/collections/auth/user-detail.collection","/both/collections/auth/menu.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/auth/menu.methods.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var role_collection_1 = require("/both/collections/auth/role.collection");                                             // 2
var user_detail_collection_1 = require("/both/collections/auth/user-detail.collection");                               // 3
var menu_collection_1 = require("/both/collections/auth/menu.collection");                                             // 4
if (meteor_1.Meteor.isServer) {                                                                                        // 9
    meteor_1.Meteor.methods({                                                                                          //
        getMenus: function () {                                                                                        //
            var menuList = [];                                                                                         //
            var userDetail = user_detail_collection_1.UserDetails.collection.findOne({ user_id: this.userId });        //
            var role = role_collection_1.Roles.collection.findOne({ _id: userDetail.role_id });                        //
            menu_collection_1.Menus.collection.find({ _id: { $in: role.menus }, is_active: true }, { sort: { order: 1 } }).forEach(function (menu) {
                menuList.push(menu);                                                                                   //
            });                                                                                                        //
            return menuList;                                                                                           //
        }                                                                                                              //
    });                                                                                                                //
}                                                                                                                      // 22
//# sourceMappingURL=menu.methods.js.map                                                                               //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"user-detail.methods.js":["meteor/meteor","/both/collections/auth/user-detail.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/auth/user-detail.methods.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var user_detail_collection_1 = require("/both/collections/auth/user-detail.collection");                               // 2
if (meteor_1.Meteor.isServer) {                                                                                        // 5
    meteor_1.Meteor.methods({                                                                                          //
        getRole: function () {                                                                                         //
            var role;                                                                                                  //
            var userDetail = user_detail_collection_1.UserDetails.collection.findOne({ user_id: this.userId });        //
            role = userDetail.role_id;                                                                                 //
            return role;                                                                                               //
        },                                                                                                             //
        validateAdmin: function () {                                                                                   //
            var role;                                                                                                  //
            var userDetail = user_detail_collection_1.UserDetails.collection.findOne({ user_id: this.userId });        //
            role = userDetail.role_id;                                                                                 //
            if (role === '100') {                                                                                      //
                return true;                                                                                           //
            }                                                                                                          //
            else {                                                                                                     //
                return false;                                                                                          //
            }                                                                                                          //
        },                                                                                                             //
        validateWaiter: function () {                                                                                  //
            var role;                                                                                                  //
            var userDetail = user_detail_collection_1.UserDetails.collection.findOne({ user_id: this.userId });        //
            role = userDetail.role_id;                                                                                 //
            if (role === '200') {                                                                                      //
                return true;                                                                                           //
            }                                                                                                          //
            else {                                                                                                     //
                return false;                                                                                          //
            }                                                                                                          //
        },                                                                                                             //
        validateCashier: function () {                                                                                 //
            var role;                                                                                                  //
            var userDetail = user_detail_collection_1.UserDetails.collection.findOne({ user_id: this.userId });        //
            role = userDetail.role_id;                                                                                 //
            if (role === '300') {                                                                                      //
                return true;                                                                                           //
            }                                                                                                          //
            else {                                                                                                     //
                return false;                                                                                          //
            }                                                                                                          //
        },                                                                                                             //
        validateCustomer: function () {                                                                                //
            var role;                                                                                                  //
            var userDetail = user_detail_collection_1.UserDetails.collection.findOne({ user_id: this.userId });        //
            role = userDetail.role_id;                                                                                 //
            if (role === '400') {                                                                                      //
                return true;                                                                                           //
            }                                                                                                          //
            else {                                                                                                     //
                return false;                                                                                          //
            }                                                                                                          //
        },                                                                                                             //
        validateChef: function () {                                                                                    //
            var role;                                                                                                  //
            var userDetail = user_detail_collection_1.UserDetails.collection.findOne({ user_id: this.userId });        //
            role = userDetail.role_id;                                                                                 //
            if (role === '500') {                                                                                      //
                return true;                                                                                           //
            }                                                                                                          //
            else {                                                                                                     //
                return false;                                                                                          //
            }                                                                                                          //
        },                                                                                                             //
        validateAdminOrSupervisor: function () {                                                                       //
            var role;                                                                                                  //
            var userDetail = user_detail_collection_1.UserDetails.collection.findOne({ user_id: this.userId });        //
            role = userDetail.role_id;                                                                                 //
            if (role === '100' || role === '600') {                                                                    //
                return true;                                                                                           //
            }                                                                                                          //
            else {                                                                                                     //
                return false;                                                                                          //
            }                                                                                                          //
        },                                                                                                             //
        getDetailsCount: function () {                                                                                 //
            var count;                                                                                                 //
            count = user_detail_collection_1.UserDetails.collection.find({ user_id: this.userId }).count();            //
            return count;                                                                                              //
        }                                                                                                              //
    });                                                                                                                //
}                                                                                                                      // 79
//# sourceMappingURL=user-detail.methods.js.map                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"user-devices.methods.js":["meteor/meteor","/both/collections/auth/device.collection","../../models/auth/device.model",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/auth/user-devices.methods.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
//import { UserDetails } from '../../collections/auth/user-detail.collection';                                         // 2
//import { UserDetail } from '../../models/auth/user-detail.model';                                                    // 3
var device_collection_1 = require("/both/collections/auth/device.collection");                                         // 5
var device_model_1 = require("../../models/auth/device.model");                                                        // 6
if (meteor_1.Meteor.isServer) {                                                                                        // 8
    meteor_1.Meteor.methods({                                                                                          //
        userDevicesValidation: function (_data) {                                                                      //
            var _device = new device_model_1.Device();                                                                 //
            var _userDevice = device_collection_1.UserDevices.collection.find({ user_id: this.userId });               //
            _device.player_id = _data.userId;                                                                          //
            _device.is_active = true;                                                                                  //
            if (_userDevice.count() === 0) {                                                                           //
                device_collection_1.UserDevices.insert({                                                               //
                    user_id: meteor_1.Meteor.userId(),                                                                 //
                    devices: [_device],                                                                                //
                });                                                                                                    //
            }                                                                                                          //
            else if (_userDevice.count() > 0) {                                                                        //
                _userDevice.fetch().forEach(function (usr_dev) {                                                       //
                    var _dev_val = device_collection_1.UserDevices.collection.find({ "devices.player_id": _data.userId });
                    if (!_dev_val) {                                                                                   //
                        device_collection_1.UserDevices.update({ _id: usr_dev._id }, { $addToSet: {                    //
                                devices: _device                                                                       //
                            }                                                                                          //
                        });                                                                                            //
                    }                                                                                                  //
                    else {                                                                                             //
                        device_collection_1.UserDevices.update({ "devices.player_id": _data.userId }, { $set: { "devices.$.is_active": true }
                        });                                                                                            //
                    }                                                                                                  //
                });                                                                                                    //
            }                                                                                                          //
        }                                                                                                              //
    });                                                                                                                //
}                                                                                                                      // 42
//# sourceMappingURL=user-devices.methods.js.map                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"user-profile.methods.js":["meteor/jalik:ufs","../../stores/auth/user.store",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/auth/user-profile.methods.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var jalik_ufs_1 = require("meteor/jalik:ufs");                                                                         // 2
var user_store_1 = require("../../stores/auth/user.store");                                                            // 3
/**                                                                                                                    // 5
 * Function allow upload user images                                                                                   //
 * @param {File} data                                                                                                  //
 * @param {String} user                                                                                                //
 * @return {Promise<any>} uploadUserImage                                                                              //
 */                                                                                                                    //
function uploadUserImage(data, user) {                                                                                 // 11
    return new Promise(function (resolve, reject) {                                                                    //
        var file = {                                                                                                   //
            name: data.name,                                                                                           //
            type: data.type,                                                                                           //
            size: data.size,                                                                                           //
            userId: user                                                                                               //
        };                                                                                                             //
        var upload = new jalik_ufs_1.UploadFS.Uploader({                                                               //
            data: data,                                                                                                //
            file: file,                                                                                                //
            store: user_store_1.UserImagesStore,                                                                       //
            onError: reject,                                                                                           //
            onComplete: resolve                                                                                        //
        });                                                                                                            //
        upload.start();                                                                                                //
    });                                                                                                                //
}                                                                                                                      // 30
exports.uploadUserImage = uploadUserImage;                                                                             // 11
//# sourceMappingURL=user-profile.methods.js.map                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"general":{"cron.methods.js":["meteor/meteor","meteor/email","/both/collections/general/email-content.collection","/both/collections/restaurant/restaurant.collection","/both/collections/restaurant/table.collection","/both/collections/payment/payment-history.collection","/both/collections/auth/user.collection","/both/collections/general/parameter.collection","meteor/meteorhacks:ssr",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/general/cron.methods.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var email_1 = require("meteor/email");                                                                                 // 3
var email_content_collection_1 = require("/both/collections/general/email-content.collection");                        // 4
var restaurant_collection_1 = require("/both/collections/restaurant/restaurant.collection");                           // 7
var table_collection_1 = require("/both/collections/restaurant/table.collection");                                     // 9
var payment_history_collection_1 = require("/both/collections/payment/payment-history.collection");                    // 11
var user_collection_1 = require("/both/collections/auth/user.collection");                                             // 13
var parameter_collection_1 = require("/both/collections/general/parameter.collection");                                // 15
var meteorhacks_ssr_1 = require("meteor/meteorhacks:ssr");                                                             // 17
if (meteor_1.Meteor.isServer) {                                                                                        // 20
    meteor_1.Meteor.methods({                                                                                          //
        /**                                                                                                            //
         * This function change the freeDays flag to false                                                             //
         * * @param {string} _countryId                                                                                //
         */                                                                                                            //
        changeFreeDaysToFalse: function (_countryId) {                                                                 //
            restaurant_collection_1.Restaurants.collection.update({ countryId: _countryId, freeDays: true }, { $set: { freeDays: false } });
        },                                                                                                             //
        /**                                                                                                            //
         * This function send the email to warn for iurest charge soon                                                 //
         * * @param {string} _countryId                                                                                //
         */                                                                                                            //
        sendEmailChargeSoon: function (_countryId) {                                                                   //
            var parameter = parameter_collection_1.Parameters.collection.findOne({ name: 'from_email' });              //
            var currentDate = new Date(2017, 6, 28);                                                                   //
            var lastMonthDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);                     //
            var auxArray = [];                                                                                         //
            restaurant_collection_1.Restaurants.collection.find({ countryId: _countryId, isActive: true }).forEach(function (restaurant) {
                var user = user_collection_1.Users.collection.findOne({ _id: restaurant.creation_user });              //
                var indexofvar = auxArray.indexOf(user._id);                                                           //
                if (indexofvar < 0) {                                                                                  //
                    auxArray.push(user._id);                                                                           //
                }                                                                                                      //
            });                                                                                                        //
            user_collection_1.Users.collection.find({ _id: { $in: auxArray } }).forEach(function (user) {              //
                var auxRestaurants = [];                                                                               //
                restaurant_collection_1.Restaurants.collection.find({ creation_user: user._id }, { fields: { _id: 0, name: 1 } }).forEach(function (name) {
                    auxRestaurants.push(name.name);                                                                    //
                });                                                                                                    //
                var emailContent = email_content_collection_1.EmailContents.collection.findOne({ language: user.profile.language_code });
                var greetVar = meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'greetVar');      //
                var greeting = (user.profile && user.profile.first_name) ? (greetVar + ' ' + user.profile.first_name + ",") : greetVar;
                meteorhacks_ssr_1.SSR.compileTemplate('chargeSoonEmailHtml', Assets.getText('charge-soon-email.html'));
                var emailData = {                                                                                      //
                    greeting: greeting,                                                                                //
                    reminderMsgVar: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'reminderChargeSoonMsgVar'),
                    restaurantListVar: auxRestaurants.toString(),                                                      //
                    reminderMsgVar2: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'reminderChargeSoonMsgVar2'),
                    dateVar: meteor_1.Meteor.call('convertDateToSimple', lastMonthDay),                                //
                    regardVar: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'regardVar'),     //
                    followMsgVar: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'followMsgVar')
                };                                                                                                     //
                email_1.Email.send({                                                                                   //
                    to: user.emails[0].address,                                                                        //
                    from: parameter.value,                                                                             //
                    subject: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'chargeSoonEmailSubjectVar'),
                    html: meteorhacks_ssr_1.SSR.render('chargeSoonEmailHtml', emailData),                              //
                });                                                                                                    //
            });                                                                                                        //
        },                                                                                                             //
        /**                                                                                                            //
         * This function send the email to warn for iurest expire soon                                                 //
         * * @param {string} _countryId                                                                                //
         */                                                                                                            //
        sendEmailExpireSoon: function (_countryId) {                                                                   //
            var parameter = parameter_collection_1.Parameters.collection.findOne({ name: 'from_email' });              //
            var currentDate = new Date(2017, 6, 3);                                                                    //
            var firstMonthDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);                        //
            var maxPaymentDay = new Date(firstMonthDay);                                                               //
            var endDay = parameter_collection_1.Parameters.collection.findOne({ name: 'end_payment_day' });            //
            maxPaymentDay.setDate(maxPaymentDay.getDate() + (Number(endDay.value) - 1));                               //
            var auxArray = [];                                                                                         //
            restaurant_collection_1.Restaurants.collection.find({ countryId: _countryId, isActive: true, freeDays: false }).forEach(function (restaurant) {
                var user = user_collection_1.Users.collection.findOne({ _id: restaurant.creation_user });              //
                var indexofvar = auxArray.indexOf(user._id);                                                           //
                if (indexofvar < 0) {                                                                                  //
                    auxArray.push(user._id);                                                                           //
                }                                                                                                      //
            });                                                                                                        //
            user_collection_1.Users.collection.find({ _id: { $in: auxArray } }).forEach(function (user) {              //
                var auxRestaurants = [];                                                                               //
                restaurant_collection_1.Restaurants.collection.find({ creation_user: user._id }, { fields: { _id: 0, name: 1 } }).forEach(function (name) {
                    auxRestaurants.push(name.name);                                                                    //
                });                                                                                                    //
                var emailContent = email_content_collection_1.EmailContents.collection.findOne({ language: user.profile.language_code });
                var greetVar = meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'greetVar');      //
                var greeting = (user.profile && user.profile.first_name) ? (greetVar + ' ' + user.profile.first_name + ",") : greetVar;
                meteorhacks_ssr_1.SSR.compileTemplate('expireSoonEmailHtml', Assets.getText('expire-soon-email.html'));
                var emailData = {                                                                                      //
                    greeting: greeting,                                                                                //
                    reminderMsgVar: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'reminderExpireSoonMsgVar'),
                    restaurantListVar: auxRestaurants.toString(),                                                      //
                    reminderMsgVar2: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'reminderExpireSoonMsgVar2'),
                    dateVar: meteor_1.Meteor.call('convertDateToSimple', maxPaymentDay),                               //
                    reminderMsgVar3: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'reminderExpireSoonMsgVar3'),
                    regardVar: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'regardVar'),     //
                    followMsgVar: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'followMsgVar')
                };                                                                                                     //
                email_1.Email.send({                                                                                   //
                    to: user.emails[0].address,                                                                        //
                    from: parameter.value,                                                                             //
                    subject: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'expireSoonEmailSubjectVar'),
                    html: meteorhacks_ssr_1.SSR.render('expireSoonEmailHtml', emailData),                              //
                });                                                                                                    //
            });                                                                                                        //
        },                                                                                                             //
        /**                                                                                                            //
         * This function validate the restaurant registered in history_payment and change isActive to false if is not  //
         * @param {string} _countryId                                                                                  //
         */                                                                                                            //
        validateActiveRestaurants: function (_countryId) {                                                             //
            var currentDate = new Date();                                                                              //
            var currentMonth = (currentDate.getMonth() + 1).toString();                                                //
            var currentYear = currentDate.getFullYear().toString();                                                    //
            restaurant_collection_1.Restaurants.collection.find({ countryId: _countryId, isActive: true, freeDays: false }).forEach(function (restaurant) {
                var historyPayment;                                                                                    //
                var auxArray = [];                                                                                     //
                auxArray.push(restaurant._id);                                                                         //
                //historyPayment = HistoryPayments.collection.findOne({ restaurantIds: restaurant._id, month: currentMonth, year: currentYear, status: 'APPROVED' });
                historyPayment = payment_history_collection_1.PaymentsHistory.collection.findOne({ restaurantIds: { $in: auxArray }, month: currentMonth, year: currentYear, status: 'TRANSACTION_STATUS.APPROVED' });
                if (!historyPayment) {                                                                                 //
                    restaurant_collection_1.Restaurants.collection.update({ _id: restaurant._id }, { $set: { isActive: false, firstPay: false } });
                    table_collection_1.Tables.collection.find({ restaurantId: restaurant._id }).forEach(function (table) {
                        table_collection_1.Tables.collection.update({ _id: table._id }, { $set: { is_active: false } });
                    });                                                                                                //
                }                                                                                                      //
            });                                                                                                        //
        },                                                                                                             //
        /**                                                                                                            //
         * This function send email to warn that the service has expired                                               //
         * @param {string} _countryId                                                                                  //
         */                                                                                                            //
        sendEmailRestExpired: function (_countryId) {                                                                  //
            var parameter = parameter_collection_1.Parameters.collection.findOne({ name: 'from_email' });              //
            var auxArray = [];                                                                                         //
            restaurant_collection_1.Restaurants.collection.find({ countryId: _countryId, isActive: false, freeDays: false, firstPay: false }).forEach(function (restaurant) {
                var user = user_collection_1.Users.collection.findOne({ _id: restaurant.creation_user });              //
                var indexofvar = auxArray.indexOf(user._id);                                                           //
                if (indexofvar < 0) {                                                                                  //
                    auxArray.push(user._id);                                                                           //
                }                                                                                                      //
            });                                                                                                        //
            user_collection_1.Users.collection.find({ _id: { $in: auxArray } }).forEach(function (user) {              //
                var auxRestaurants = [];                                                                               //
                restaurant_collection_1.Restaurants.collection.find({ creation_user: user._id, isActive: false, freeDays: false }, { fields: { _id: 0, name: 1 } }).forEach(function (name) {
                    auxRestaurants.push(name.name);                                                                    //
                });                                                                                                    //
                var emailContent = email_content_collection_1.EmailContents.collection.findOne({ language: user.profile.language_code });
                var greetVar = meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'greetVar');      //
                var greeting = (user.profile && user.profile.first_name) ? (greetVar + ' ' + user.profile.first_name + ",") : greetVar;
                meteorhacks_ssr_1.SSR.compileTemplate('restExpiredEmailHtml', Assets.getText('rest-expired-email.html'));
                var emailData = {                                                                                      //
                    greeting: greeting,                                                                                //
                    reminderMsgVar: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'reminderRestExpiredVar'),
                    restaurantListVar: auxRestaurants.toString(),                                                      //
                    reminderMsgVar2: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'reminderRestExpiredVar2'),
                    reminderMsgVar3: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'reminderRestExpiredVar3'),
                    regardVar: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'regardVar'),     //
                    followMsgVar: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'followMsgVar')
                };                                                                                                     //
                email_1.Email.send({                                                                                   //
                    to: user.emails[0].address,                                                                        //
                    from: parameter.value,                                                                             //
                    subject: meteor_1.Meteor.call('getEmailContent', emailContent.lang_dictionary, 'restExpiredEmailSubjectVar'),
                    html: meteorhacks_ssr_1.SSR.render('restExpiredEmailHtml', emailData),                             //
                });                                                                                                    //
            });                                                                                                        //
        },                                                                                                             //
        /**                                                                                                            //
         * This function gets the value from EmailContent collection                                                   //
         * @param {string} _countryId                                                                                  //
         * @return {string}                                                                                            //
         */                                                                                                            //
        getEmailContent: function (_langDictionary, _label) {                                                          //
            var value = _langDictionary.filter(function (wordTraduced) {                                               //
                return wordTraduced.label == _label;                                                                   //
            });                                                                                                        //
            return value[0].traduction;                                                                                //
        },                                                                                                             //
        /**                                                                                                            //
         * This function convert the day and returning in format yyyy-m-d                                              //
         * @param {Date} _date                                                                                         //
         * @return {string}                                                                                            //
         */                                                                                                            //
        convertDateToSimple: function (_date) {                                                                        //
            var year = _date.getFullYear();                                                                            //
            var month = _date.getMonth() + 1;                                                                          //
            var day = _date.getDate();                                                                                 //
            return day.toString() + '/' + month.toString() + '/' + year.toString();                                    //
        }                                                                                                              //
    });                                                                                                                //
}                                                                                                                      // 223
//# sourceMappingURL=cron.methods.js.map                                                                               //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"email.methods.js":["meteor/meteor","meteor/email","/both/collections/general/email-content.collection","/both/collections/restaurant/restaurant.collection","/both/collections/auth/user.collection","/both/collections/general/parameter.collection","meteor/meteorhacks:ssr",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/general/email.methods.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var email_1 = require("meteor/email");                                                                                 // 3
var email_content_collection_1 = require("/both/collections/general/email-content.collection");                        // 4
var restaurant_collection_1 = require("/both/collections/restaurant/restaurant.collection");                           // 6
var user_collection_1 = require("/both/collections/auth/user.collection");                                             // 8
var parameter_collection_1 = require("/both/collections/general/parameter.collection");                                // 10
var meteorhacks_ssr_1 = require("meteor/meteorhacks:ssr");                                                             // 12
if (meteor_1.Meteor.isServer) {                                                                                        // 14
    meteor_1.Meteor.methods({                                                                                          //
        /**                                                                                                            //
         * This function validate if restaurant trial period has ended                                                 //
         */                                                                                                            //
        validateTrialPeriod: function (_countryId) {                                                                   //
            var currentDate = new Date();                                                                              //
            var currentString = meteor_1.Meteor.call('convertDate', currentDate);                                      //
            var trialDays = Number.parseInt(parameter_collection_1.Parameters.collection.findOne({ name: 'trial_days' }).value);
            var firstAdviceDays = Number.parseInt(parameter_collection_1.Parameters.collection.findOne({ name: 'first_advice_days' }).value);
            var secondAdviceDays = Number.parseInt(parameter_collection_1.Parameters.collection.findOne({ name: 'second_advice_days' }).value);
            var thirdAdviceDays = Number.parseInt(parameter_collection_1.Parameters.collection.findOne({ name: 'third_advice_days' }).value);
            restaurant_collection_1.Restaurants.collection.find({ countryId: _countryId, isActive: true, tstPeriod: true }).forEach(function (restaurant) {
                var diff = Math.round((currentDate.valueOf() - restaurant.creation_date.valueOf()) / (1000 * 60 * 60 * 24));
                var forwardDate = meteor_1.Meteor.call('addDays', restaurant.creation_date, trialDays);                //
                var forwardString = meteor_1.Meteor.call('convertDate', forwardDate);                                  //
                var firstAdviceDate = meteor_1.Meteor.call('substractDays', forwardDate, firstAdviceDays);             //
                var firstAdviceString = meteor_1.Meteor.call('convertDate', firstAdviceDate);                          //
                var secondAdviceDate = meteor_1.Meteor.call('substractDays', forwardDate, secondAdviceDays);           //
                var secondAdviceString = meteor_1.Meteor.call('convertDate', secondAdviceDate);                        //
                var thirdAdviceDate = meteor_1.Meteor.call('substractDays', forwardDate, thirdAdviceDays);             //
                var thirdAdviceString = meteor_1.Meteor.call('convertDate', thirdAdviceDate);                          //
                if (diff > trialDays) {                                                                                //
                    restaurant_collection_1.Restaurants.collection.update({ _id: restaurant._id }, { $set: { isActive: false, tstPeriod: false } });
                }                                                                                                      //
                else {                                                                                                 //
                    if (currentString == firstAdviceString || currentString == secondAdviceString || currentString == thirdAdviceString) {
                        meteor_1.Meteor.call('sendTrialEmail', restaurant.creation_user, forwardString);               //
                    }                                                                                                  //
                }                                                                                                      //
            });                                                                                                        //
            return "emailSend";                                                                                        //
        },                                                                                                             //
        /**                                                                                                            //
         * This function convert the day and returning in format yyyy-m-d                                              //
         */                                                                                                            //
        convertDate: function (_date) {                                                                                //
            var year = _date.getFullYear();                                                                            //
            var month = _date.getMonth() + 1;                                                                          //
            var day = _date.getDate();                                                                                 //
            return year.toString() + '-' + month.toString() + '-' + day.toString();                                    //
        },                                                                                                             //
        /**                                                                                                            //
         * This function add days to the passed date                                                                   //
         */                                                                                                            //
        addDays: function (_date, _days) {                                                                             //
            var result = new Date(_date);                                                                              //
            result.setDate(result.getDate() + _days);                                                                  //
            return result;                                                                                             //
        },                                                                                                             //
        /**                                                                                                            //
         * This function substract days to the passed date                                                             //
         */                                                                                                            //
        substractDays: function (_date, _days) {                                                                       //
            var result = new Date(_date);                                                                              //
            result.setDate(result.getDate() - _days);                                                                  //
            return result;                                                                                             //
        },                                                                                                             //
        /**                                                                                                            //
         * This function send de email to the account admin registered if trial period is going to end                 //
         */                                                                                                            //
        sendTrialEmail: function (_userId, _forwardDate) {                                                             //
            var user = user_collection_1.Users.collection.findOne({ _id: _userId });                                   //
            var parameter = parameter_collection_1.Parameters.collection.findOne({ name: 'from_email' });              //
            var emailContent = email_content_collection_1.EmailContents.collection.findOne({ language: user.profile.language_code });
            var trial_email_subject = emailContent.lang_dictionary[0].traduction;                                      //
            var greeting = (user.profile && user.profile.first_name) ? (emailContent.lang_dictionary[1].traduction + ' ' + user.profile.first_name + ",") : emailContent.lang_dictionary[1].traduction;
            meteorhacks_ssr_1.SSR.compileTemplate('htmlEmail', Assets.getText('html-email.html'));                     //
            var emailData = {                                                                                          //
                greeting: greeting,                                                                                    //
                reminderMsgVar: emailContent.lang_dictionary[7].traduction,                                            //
                dateVar: _forwardDate,                                                                                 //
                instructionMsgVar: emailContent.lang_dictionary[8].traduction,                                         //
                regardVar: emailContent.lang_dictionary[5].traduction,                                                 //
                followMsgVar: emailContent.lang_dictionary[6].traduction                                               //
            };                                                                                                         //
            email_1.Email.send({                                                                                       //
                to: user.emails[0].address,                                                                            //
                from: parameter.value,                                                                                 //
                subject: trial_email_subject,                                                                          //
                html: meteorhacks_ssr_1.SSR.render('htmlEmail', emailData),                                            //
            });                                                                                                        //
        }                                                                                                              //
    });                                                                                                                //
}                                                                                                                      // 105
//# sourceMappingURL=email.methods.js.map                                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"parameter.methods.js":["meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/general/parameter.methods.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
function getPayuMerchantInfo() {                                                                                       // 7
    var credentialList = [];                                                                                           //
    //TODO implements functions to encode credentials                                                                  //
    credentialList[0] = 'pRRXKOl8ikMmt9u';                                                                             //
    credentialList[1] = '4Vj8eK4rloUd272L48hsrarnUA';                                                                  //
    return credentialList;                                                                                             //
}                                                                                                                      // 14
exports.getPayuMerchantInfo = getPayuMerchantInfo;                                                                     // 7
if (meteor_1.Meteor.isServer) {                                                                                        // 16
    meteor_1.Meteor.methods({                                                                                          //
        getPayuMerchantData: function () {                                                                             //
            var credentialList = [];                                                                                   //
            //TODO implements functions to encode credentials                                                          //
            credentialList[0] = 'pRRXKOl8ikMmt9u';                                                                     //
            credentialList[1] = '4Vj8eK4rloUd272L48hsrarnUA';                                                          //
            return credentialList;                                                                                     //
        }                                                                                                              //
    });                                                                                                                //
}                                                                                                                      // 28
//# sourceMappingURL=parameter.methods.js.map                                                                          //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"settings":{"change-email.methods.js":["meteor/meteor","meteor/accounts-base",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/settings/change-email.methods.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var accounts_base_1 = require("meteor/accounts-base");                                                                 // 2
if (meteor_1.Meteor.isServer) {                                                                                        // 6
    meteor_1.Meteor.methods({                                                                                          //
        addEmail: function (newEmail) {                                                                                //
            accounts_base_1.Accounts.addEmail(meteor_1.Meteor.userId(), newEmail, true);                               //
        }                                                                                                              //
    });                                                                                                                //
    meteor_1.Meteor.methods({                                                                                          //
        removeEmail: function (oldEmail) {                                                                             //
            accounts_base_1.Accounts.removeEmail(meteor_1.Meteor.userId(), oldEmail);                                  //
        }                                                                                                              //
    });                                                                                                                //
}                                                                                                                      // 20
//# sourceMappingURL=change-email.methods.js.map                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"country.methods.js":["meteor/meteor","/both/collections/settings/country.collection","/both/collections/restaurant/restaurant.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/settings/country.methods.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var country_collection_1 = require("/both/collections/settings/country.collection");                                   // 2
var restaurant_collection_1 = require("/both/collections/restaurant/restaurant.collection");                           // 4
if (meteor_1.Meteor.isServer) {                                                                                        // 9
    meteor_1.Meteor.methods({                                                                                          //
        getCountryByRestaurantId: function (_restaurantId) {                                                           //
            var tables_length;                                                                                         //
            var country;                                                                                               //
            var restaurant;                                                                                            //
            restaurant = restaurant_collection_1.Restaurants.collection.findOne({ _id: _restaurantId });               //
            country = country_collection_1.Countries.findOne({ _id: restaurant.countryId });                           //
            return country.name;                                                                                       //
        }                                                                                                              //
    });                                                                                                                //
}                                                                                                                      // 24
//# sourceMappingURL=country.methods.js.map                                                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"utils":{"push-notifications.methods.js":["meteor/meteor","meteor/astrocoders:one-signal",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/methods/utils/push-notifications.methods.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var astrocoders_one_signal_1 = require("meteor/astrocoders:one-signal");                                               // 2
if (meteor_1.Meteor.isServer) {                                                                                        // 4
    meteor_1.Meteor.methods({                                                                                          //
        sendPush: function (_userDeviceId, content) {                                                                  //
            var data = {                                                                                               //
                contents: {                                                                                            //
                    en: content,                                                                                       //
                }                                                                                                      //
            };                                                                                                         //
            astrocoders_one_signal_1.OneSignal.Notifications.create(_userDeviceId, data);                              //
        }                                                                                                              //
    });                                                                                                                //
}                                                                                                                      // 15
//# sourceMappingURL=push-notifications.methods.js.map                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"shared-components":{"auth":{"recover-password":{"recover.class.js":["@angular/forms","meteor/accounts-base","../../validators/custom-validator",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/shared-components/auth/recover-password/recover.class.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var forms_1 = require("@angular/forms");                                                                               // 2
var accounts_base_1 = require("meteor/accounts-base");                                                                 // 3
var custom_validator_1 = require("../../validators/custom-validator");                                                 // 5
var RecoverClass = (function () {                                                                                      // 7
    /**                                                                                                                //
     * RecoverClass Constructor                                                                                        //
     * @param {NgZone} zone                                                                                            //
     * @param {TranslateService} translate                                                                             //
     * @param {UserLanguageService} _userLanguageService                                                               //
     */                                                                                                                //
    function RecoverClass(zone, translate) {                                                                           //
        this.zone = zone;                                                                                              //
        this.translate = translate;                                                                                    //
        var userLang = navigator.language.split('-')[0];                                                               //
        translate.setDefaultLang('en');                                                                                //
        translate.use(userLang);                                                                                       //
    }                                                                                                                  //
    RecoverClass.prototype.ngOnInit = function () {                                                                    //
        this.recoverForm = new forms_1.FormGroup({                                                                     //
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6), forms_1.Validators.maxLength(40), custom_validator_1.CustomValidators.emailValidator])
        });                                                                                                            //
    };                                                                                                                 //
    RecoverClass.prototype.recover = function () {                                                                     //
        var _this = this;                                                                                              //
        if (this.recoverForm.valid) {                                                                                  //
            this.zone.run(function () {                                                                                //
                accounts_base_1.Accounts.forgotPassword({                                                              //
                    email: _this.recoverForm.value.email                                                               //
                }, function (err) {                                                                                    //
                    if (err) {                                                                                         //
                        _this.showError(err);                                                                          //
                    }                                                                                                  //
                    else {                                                                                             //
                        _this.showAlert('RESET_PASWORD.EMAIL_SEND');                                                   //
                    }                                                                                                  //
                });                                                                                                    //
            });                                                                                                        //
        }                                                                                                              //
    };                                                                                                                 //
    RecoverClass.prototype.showAlert = function (message) { };                                                         //
    RecoverClass.prototype.showError = function (error) { };                                                           //
    RecoverClass.prototype.cancel = function () { };                                                                   //
    RecoverClass.prototype.itemNameTraduction = function (itemName) {                                                  //
        var wordTraduced;                                                                                              //
        this.translate.get(itemName).subscribe(function (res) {                                                        //
            wordTraduced = res;                                                                                        //
        });                                                                                                            //
        return wordTraduced;                                                                                           //
    };                                                                                                                 //
    return RecoverClass;                                                                                               //
}());                                                                                                                  // 61
exports.RecoverClass = RecoverClass;                                                                                   // 7
//# sourceMappingURL=recover.class.js.map                                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"reset-password.class.js":["@angular/forms","meteor/accounts-base",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/shared-components/auth/reset-password.class.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var forms_1 = require("@angular/forms");                                                                               // 2
var accounts_base_1 = require("meteor/accounts-base");                                                                 // 3
var ResetPasswordClass = (function () {                                                                                // 10
    /**                                                                                                                //
     * ResetPasswordClass Constructor                                                                                  //
     * @param {NgZone} zone                                                                                            //
     * @param {TranslateService} translate                                                                             //
     * @param {ActivatedRoute} route                                                                                   //
     * @param {UserLanguageService} _userLanguageService                                                               //
     */                                                                                                                //
    function ResetPasswordClass(zone, translate, route) {                                                              //
        this.zone = zone;                                                                                              //
        this.translate = translate;                                                                                    //
        this.route = route;                                                                                            //
        this.showConfirmError = false;                                                                                 //
        var userLang = navigator.language.split('-')[0];                                                               //
        translate.setDefaultLang('en');                                                                                //
        translate.use(userLang);                                                                                       //
    }                                                                                                                  //
    ResetPasswordClass.prototype.ngOnInit = function () {                                                              //
        var _this = this;                                                                                              //
        this.route.params.forEach(function (params) {                                                                  //
            _this.tokenId = params['tk'];                                                                              //
        });                                                                                                            //
        this.resetPasswordForm = new forms_1.FormGroup({                                                               //
            password: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(8), forms_1.Validators.maxLength(20)]),
            confirmPassword: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(8), forms_1.Validators.maxLength(20)])
        });                                                                                                            //
    };                                                                                                                 //
    ResetPasswordClass.prototype.resetPassword = function () {                                                         //
        var _this = this;                                                                                              //
        if (this.resetPasswordForm.valid) {                                                                            //
            if (this.resetPasswordForm.value.password == this.resetPasswordForm.value.confirmPassword) {               //
                accounts_base_1.Accounts.resetPassword(this.tokenId, this.resetPasswordForm.value.password, function (err) {
                    _this.zone.run(function () {                                                                       //
                        if (err) {                                                                                     //
                            //this.error = err;                                                                        //
                            _this.showError(err);                                                                      //
                        }                                                                                              //
                        else {                                                                                         //
                            _this.showAlert('RESET_PASWORD.SUCCESS');                                                  //
                        }                                                                                              //
                    });                                                                                                //
                });                                                                                                    //
            }                                                                                                          //
            else {                                                                                                     //
                this.showConfirmError = true;                                                                          //
            }                                                                                                          //
        }                                                                                                              //
    };                                                                                                                 //
    ResetPasswordClass.prototype.showAlert = function (message) { };                                                   //
    ResetPasswordClass.prototype.showError = function (error) {                                                        //
        alert();                                                                                                       //
    };                                                                                                                 //
    ResetPasswordClass.prototype.itemNameTraduction = function (itemName) {                                            //
        var wordTraduced;                                                                                              //
        this.translate.get(itemName).subscribe(function (res) {                                                        //
            wordTraduced = res;                                                                                        //
        });                                                                                                            //
        return wordTraduced;                                                                                           //
    };                                                                                                                 //
    return ResetPasswordClass;                                                                                         //
}());                                                                                                                  // 81
exports.ResetPasswordClass = ResetPasswordClass;                                                                       // 10
//# sourceMappingURL=reset-password.class.js.map                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"restaurant":{"financial-info":{"financial-base.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/shared-components/restaurant/financial-info/financial-base.js                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
/**                                                                                                                    // 1
 * Financial Base Class                                                                                                //
 */                                                                                                                    //
var FinancialBase = (function () {                                                                                     // 4
    /**                                                                                                                //
     * FinancialBase Constructor                                                                                       //
     * @param options                                                                                                  //
     */                                                                                                                //
    function FinancialBase(options) {                                                                                  //
        if (options === void 0) { options = {}; }                                                                      //
        this.value = options.value;                                                                                    //
        this.key = options.key || '';                                                                                  //
        this.label = options.label || '';                                                                              //
        this.required = !!options.required;                                                                            //
        this.order = options.order === undefined ? 1 : options.order;                                                  //
        this.controlType = options.controlType || '';                                                                  //
        this.minValue = options.minValue === undefined ? 0 : options.minValue;                                         //
        this.maxValue = options.maxValue === undefined ? 0 : options.maxValue;                                         //
        this.stepValue = options.stepValue === undefined ? 1 : options.stepValue;                                      //
    }                                                                                                                  //
    return FinancialBase;                                                                                              //
}());                                                                                                                  // 40
exports.FinancialBase = FinancialBase;                                                                                 // 4
//# sourceMappingURL=financial-base.js.map                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"financial-checkbox.js":["/both/shared-components/restaurant/financial-info/financial-base",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/shared-components/restaurant/financial-info/financial-checkbox.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var financial_base_1 = require("/both/shared-components/restaurant/financial-info/financial-base");                    // 1
var FinancialCheckBox = (function (_super) {                                                                           // 3
    __extends(FinancialCheckBox, _super);                                                                              //
    /**                                                                                                                //
     * FinancialCheckBox Constructor                                                                                   //
     * @param options                                                                                                  //
     */                                                                                                                //
    function FinancialCheckBox(options) {                                                                              //
        if (options === void 0) { options = {}; }                                                                      //
        var _this = _super.call(this, options) || this;                                                                //
        _this.controlType = 'checkbox';                                                                                //
        return _this;                                                                                                  //
    }                                                                                                                  //
    return FinancialCheckBox;                                                                                          //
}(financial_base_1.FinancialBase));                                                                                    // 13
exports.FinancialCheckBox = FinancialCheckBox;                                                                         // 3
//# sourceMappingURL=financial-checkbox.js.map                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"financial-dropdown.js":["/both/shared-components/restaurant/financial-info/financial-base",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/shared-components/restaurant/financial-info/financial-dropdown.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var financial_base_1 = require("/both/shared-components/restaurant/financial-info/financial-base");                    // 1
var FinancialDropDown = (function (_super) {                                                                           // 3
    __extends(FinancialDropDown, _super);                                                                              //
    /**                                                                                                                //
     * FinancialDropDown Constructor                                                                                   //
     * @param options                                                                                                  //
     */                                                                                                                //
    function FinancialDropDown(options) {                                                                              //
        if (options === void 0) { options = {}; }                                                                      //
        var _this = _super.call(this, options) || this;                                                                //
        _this.controlType = 'dropdown';                                                                                //
        _this.options = [];                                                                                            //
        _this.options = options['options'] || [];                                                                      //
        return _this;                                                                                                  //
    }                                                                                                                  //
    return FinancialDropDown;                                                                                          //
}(financial_base_1.FinancialBase));                                                                                    // 15
exports.FinancialDropDown = FinancialDropDown;                                                                         // 3
//# sourceMappingURL=financial-dropdown.js.map                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"financial-slider.js":["/both/shared-components/restaurant/financial-info/financial-base",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/shared-components/restaurant/financial-info/financial-slider.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var financial_base_1 = require("/both/shared-components/restaurant/financial-info/financial-base");                    // 1
var FinancialSlider = (function (_super) {                                                                             // 3
    __extends(FinancialSlider, _super);                                                                                //
    /**                                                                                                                //
     * FinancialSlider Constructor                                                                                     //
     * @param options                                                                                                  //
     */                                                                                                                //
    function FinancialSlider(options) {                                                                                //
        if (options === void 0) { options = {}; }                                                                      //
        var _this = _super.call(this, options) || this;                                                                //
        _this.controlType = 'slider';                                                                                  //
        _this.minValue = options['minValue'] || '';                                                                    //
        _this.maxValue = options['maxValue'] || '';                                                                    //
        _this.stepValue = options['stepValue'] || '';                                                                  //
        return _this;                                                                                                  //
    }                                                                                                                  //
    return FinancialSlider;                                                                                            //
}(financial_base_1.FinancialBase));                                                                                    // 19
exports.FinancialSlider = FinancialSlider;                                                                             // 3
//# sourceMappingURL=financial-slider.js.map                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"financial-text.js":["/both/shared-components/restaurant/financial-info/financial-base",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/shared-components/restaurant/financial-info/financial-text.js                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var financial_base_1 = require("/both/shared-components/restaurant/financial-info/financial-base");                    // 1
var FinancialText = (function (_super) {                                                                               // 3
    __extends(FinancialText, _super);                                                                                  //
    /**                                                                                                                //
     * FinancialText Constructor                                                                                       //
     * @param options                                                                                                  //
     */                                                                                                                //
    function FinancialText(options) {                                                                                  //
        if (options === void 0) { options = {}; }                                                                      //
        var _this = _super.call(this, options) || this;                                                                //
        _this.controlType = 'text';                                                                                    //
        return _this;                                                                                                  //
    }                                                                                                                  //
    return FinancialText;                                                                                              //
}(financial_base_1.FinancialBase));                                                                                    // 13
exports.FinancialText = FinancialText;                                                                                 // 3
//# sourceMappingURL=financial-text.js.map                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"financial-textbox.js":["/both/shared-components/restaurant/financial-info/financial-base",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/shared-components/restaurant/financial-info/financial-textbox.js                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var financial_base_1 = require("/both/shared-components/restaurant/financial-info/financial-base");                    // 1
var FinancialTextBox = (function (_super) {                                                                            // 3
    __extends(FinancialTextBox, _super);                                                                               //
    /**                                                                                                                //
     * FinancialTextBox Constructor                                                                                    //
     * @param options                                                                                                  //
     */                                                                                                                //
    function FinancialTextBox(options) {                                                                               //
        if (options === void 0) { options = {}; }                                                                      //
        var _this = _super.call(this, options) || this;                                                                //
        _this.controlType = 'textbox';                                                                                 //
        _this.type = options['type'] || '';                                                                            //
        return _this;                                                                                                  //
    }                                                                                                                  //
    return FinancialTextBox;                                                                                           //
}(financial_base_1.FinancialBase));                                                                                    // 15
exports.FinancialTextBox = FinancialTextBox;                                                                           // 3
//# sourceMappingURL=financial-textbox.js.map                                                                          //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"validators":{"custom-validator.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/shared-components/validators/custom-validator.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var CustomValidators = (function () {                                                                                  // 3
    function CustomValidators() {                                                                                      //
    }                                                                                                                  //
    CustomValidators.emailValidator = function (control) {                                                             //
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+?/)) {
            return null;                                                                                               //
        }                                                                                                              //
        else {                                                                                                         //
            return { 'invalidEmailAddress': true };                                                                    //
        }                                                                                                              //
    };                                                                                                                 //
    CustomValidators.numericValidator = function (control) {                                                           //
        if (control.value.match(/^(0|[1-9][0-9]*)$/)) {                                                                //
            return null;                                                                                               //
        }                                                                                                              //
        else {                                                                                                         //
            return { 'invalidNumericField': true };                                                                    //
        }                                                                                                              //
    };                                                                                                                 //
    CustomValidators.letterValidator = function (control) {                                                            //
        if (control.value.match(/^[A-z]+$/)) {                                                                         //
            return null;                                                                                               //
        }                                                                                                              //
        else {                                                                                                         //
            return { 'invalidLetterField': true };                                                                     //
        }                                                                                                              //
    };                                                                                                                 //
    CustomValidators.letterSpaceValidator = function (control) {                                                       //
        if (control.value.match(/^[a-zA-Z\s]*$/)) {                                                                    //
            return null;                                                                                               //
        }                                                                                                              //
        else {                                                                                                         //
            return { 'invalidLetterSpaceField': true };                                                                //
        }                                                                                                              //
    };                                                                                                                 //
    CustomValidators.dayOfDateValidator = function (control) {                                                         //
        if (control.value >= 1 && control.value <= 31) {                                                               //
            return null;                                                                                               //
        }                                                                                                              //
        else {                                                                                                         //
            return { 'invalidDayField': true };                                                                        //
        }                                                                                                              //
    };                                                                                                                 //
    CustomValidators.monthOfDateValidator = function (control) {                                                       //
        if (control.value >= 1 && control.value <= 12) {                                                               //
            return null;                                                                                               //
        }                                                                                                              //
        else {                                                                                                         //
            return { 'invalidMonthField': true };                                                                      //
        }                                                                                                              //
    };                                                                                                                 //
    CustomValidators.yearOfDateValidator = function (control) {                                                        //
        if (control.value >= 1970) {                                                                                   //
            return null;                                                                                               //
        }                                                                                                              //
        else {                                                                                                         //
            return { 'invalidYearField': true };                                                                       //
        }                                                                                                              //
    };                                                                                                                 //
    return CustomValidators;                                                                                           //
}());                                                                                                                  // 75
exports.CustomValidators = CustomValidators;                                                                           // 3
//# sourceMappingURL=custom-validator.js.map                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"collections":{"administration":{"addition.collection.js":["meteor-rxjs",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/administration/addition.collection.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
/**                                                                                                                    // 4
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 7
    return !!Meteor.user();                                                                                            //
}                                                                                                                      // 9
/**                                                                                                                    // 11
 * Addition Collection                                                                                                 //
 */                                                                                                                    //
exports.Additions = new meteor_rxjs_1.MongoObservable.Collection('additions');                                         // 14
/**                                                                                                                    // 16
 * Allow Addition collection insert and update functions                                                               //
 */                                                                                                                    //
exports.Additions.allow({                                                                                              // 19
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=addition.collection.js.map                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"category.collection.js":["meteor-rxjs",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/administration/category.collection.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
/**                                                                                                                    // 4
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 7
    return !!Meteor.user();                                                                                            //
}                                                                                                                      // 9
/**                                                                                                                    // 11
 * Categories Collection                                                                                               //
 */                                                                                                                    //
exports.Categories = new meteor_rxjs_1.MongoObservable.Collection('categories');                                       // 14
/**                                                                                                                    // 16
 * Allow Category collection insert and update functions                                                               //
 */                                                                                                                    //
exports.Categories.allow({                                                                                             // 19
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=category.collection.js.map                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"garnish-food.collection.js":["meteor-rxjs",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/administration/garnish-food.collection.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
/**                                                                                                                    // 4
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 7
    return !!Meteor.user();                                                                                            //
}                                                                                                                      // 9
/**                                                                                                                    // 11
 * Garnish Food Collecion                                                                                              //
 */                                                                                                                    //
exports.GarnishFoodCol = new meteor_rxjs_1.MongoObservable.Collection('garnishFood');                                  // 14
/**                                                                                                                    // 16
 * Allow Garnish Food collection insert and update functions                                                           //
 */                                                                                                                    //
exports.GarnishFoodCol.allow({                                                                                         // 19
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=garnish-food.collection.js.map                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"item.collection.js":["meteor-rxjs",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/administration/item.collection.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
/**                                                                                                                    // 4
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 7
    return !!Meteor.user();                                                                                            //
}                                                                                                                      // 9
/**                                                                                                                    // 11
 * Items Collection                                                                                                    //
 */                                                                                                                    //
exports.Items = new meteor_rxjs_1.MongoObservable.Collection('items');                                                 // 14
/**                                                                                                                    // 16
 * Allow Items collection insert and update functions                                                                  //
 */                                                                                                                    //
exports.Items.allow({                                                                                                  // 19
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
/**                                                                                                                    // 24
 * Item Image Thumbs Collection                                                                                        //
 */                                                                                                                    //
exports.ItemImagesThumbs = new meteor_rxjs_1.MongoObservable.Collection('itemImageThumbs');                            // 27
/**                                                                                                                    // 29
 * Allow Item Image Thumbs Collection insert, update and remove functions                                              //
 */                                                                                                                    //
exports.ItemImagesThumbs.allow({                                                                                       // 32
    insert: loggedIn,                                                                                                  //
    update: loggedIn,                                                                                                  //
    remove: loggedIn                                                                                                   //
});                                                                                                                    //
/**                                                                                                                    // 38
 * Item Images Collection                                                                                              //
 */                                                                                                                    //
exports.ItemImages = new meteor_rxjs_1.MongoObservable.Collection('itemImages');                                       // 41
/**                                                                                                                    // 43
 * Allow Item Images collection insert, update and remove functions                                                    //
 */                                                                                                                    //
exports.ItemImages.allow({                                                                                             // 46
    insert: loggedIn,                                                                                                  //
    update: loggedIn,                                                                                                  //
    remove: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=item.collection.js.map                                                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"promotion.collection.js":["meteor-rxjs",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/administration/promotion.collection.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
/**                                                                                                                    // 4
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 7
    return !!Meteor.user();                                                                                            //
}                                                                                                                      // 9
/**                                                                                                                    // 11
 * Promotion Collection                                                                                                //
 */                                                                                                                    //
exports.Promotions = new meteor_rxjs_1.MongoObservable.Collection('promotions');                                       // 14
/**                                                                                                                    // 16
 * Allow Promotion collection insert and update functions                                                              //
 */                                                                                                                    //
exports.Promotions.allow({                                                                                             // 19
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
/**                                                                                                                    // 24
 * Promotion Image Thumbs Collection                                                                                   //
 */                                                                                                                    //
exports.PromotionImagesThumbs = new meteor_rxjs_1.MongoObservable.Collection('promotionImageThumbs');                  // 27
/**                                                                                                                    // 29
 * Allow Promotion Image Thumbs Collection insert, update and remove functions                                         //
 */                                                                                                                    //
exports.PromotionImagesThumbs.allow({                                                                                  // 32
    insert: loggedIn,                                                                                                  //
    update: loggedIn,                                                                                                  //
    remove: loggedIn                                                                                                   //
});                                                                                                                    //
/**                                                                                                                    // 38
 * Promotion Images Collection                                                                                         //
 */                                                                                                                    //
exports.PromotionImages = new meteor_rxjs_1.MongoObservable.Collection('promotionImages');                             // 41
/**                                                                                                                    // 43
 * Allow Promotion Images Collection insert, update and remove functions                                               //
 */                                                                                                                    //
exports.PromotionImages.allow({                                                                                        // 46
    insert: loggedIn,                                                                                                  //
    update: loggedIn,                                                                                                  //
    remove: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=promotion.collection.js.map                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"section.collection.js":["meteor-rxjs",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/administration/section.collection.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
/**                                                                                                                    // 4
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 7
    return !!Meteor.user();                                                                                            //
}                                                                                                                      // 9
/**                                                                                                                    // 11
 * Section Collection                                                                                                  //
 */                                                                                                                    //
exports.Sections = new meteor_rxjs_1.MongoObservable.Collection('sections');                                           // 14
/**                                                                                                                    // 16
 * Allow Section collection insert and update functions                                                                //
 */                                                                                                                    //
exports.Sections.allow({                                                                                               // 19
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=section.collection.js.map                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"subcategory.collection.js":["meteor-rxjs",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/administration/subcategory.collection.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
/**                                                                                                                    // 4
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 7
    return !!Meteor.user();                                                                                            //
}                                                                                                                      // 9
/**                                                                                                                    // 11
 * Subcategory Collection                                                                                              //
 */                                                                                                                    //
exports.Subcategories = new meteor_rxjs_1.MongoObservable.Collection('subcategories');                                 // 14
/**                                                                                                                    // 16
 * Allow Subcategory collection insert and update functions                                                            //
 */                                                                                                                    //
exports.Subcategories.allow({                                                                                          // 19
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=subcategory.collection.js.map                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"auth":{"device.collection.js":["meteor-rxjs",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/auth/device.collection.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
exports.UserDevices = new meteor_rxjs_1.MongoObservable.Collection('user_devices');                                    // 4
function loggedIn() {                                                                                                  // 6
    return !!Meteor.user();                                                                                            //
}                                                                                                                      // 8
exports.UserDevices.allow({                                                                                            // 10
    insert: loggedIn,                                                                                                  //
    update: loggedIn,                                                                                                  //
    remove: loggedIn,                                                                                                  //
});                                                                                                                    //
//# sourceMappingURL=device.collection.js.map                                                                          //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"menu.collection.js":["meteor-rxjs",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/auth/menu.collection.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
exports.Menus = new meteor_rxjs_1.MongoObservable.Collection('menus');                                                 // 4
//# sourceMappingURL=menu.collection.js.map                                                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"role.collection.js":["meteor-rxjs",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/auth/role.collection.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
exports.Roles = new meteor_rxjs_1.MongoObservable.Collection('roles');                                                 // 4
//# sourceMappingURL=role.collection.js.map                                                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"user-detail.collection.js":["meteor-rxjs",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/auth/user-detail.collection.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
exports.UserDetails = new meteor_rxjs_1.MongoObservable.Collection('user_details');                                    // 4
function loggedIn() {                                                                                                  // 6
    return !!Meteor.user();                                                                                            //
}                                                                                                                      // 8
exports.UserDetails.allow({                                                                                            // 10
    insert: loggedIn,                                                                                                  //
    update: loggedIn,                                                                                                  //
    remove: loggedIn,                                                                                                  //
});                                                                                                                    //
//# sourceMappingURL=user-detail.collection.js.map                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"user.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/auth/user.collection.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 2
/**                                                                                                                    // 5
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 8
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 10
/**                                                                                                                    // 12
 * Users Collection                                                                                                    //
 */                                                                                                                    //
exports.Users = meteor_rxjs_1.MongoObservable.fromExisting(meteor_1.Meteor.users);                                     // 15
/**                                                                                                                    // 17
 * Allow Users collection update functions                                                                             //
 */                                                                                                                    //
exports.Users.allow({                                                                                                  // 20
    update: loggedIn                                                                                                   //
});                                                                                                                    //
/**                                                                                                                    // 24
 * User Images Collection                                                                                              //
 */                                                                                                                    //
exports.UserImages = new meteor_rxjs_1.MongoObservable.Collection('userImages');                                       // 27
/**                                                                                                                    // 29
 * Allow User Images collection insert, update and remove functions                                                    //
 */                                                                                                                    //
exports.UserImages.allow({                                                                                             // 32
    insert: loggedIn,                                                                                                  //
    update: loggedIn,                                                                                                  //
    remove: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=user.collection.js.map                                                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"general":{"currency.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/general/currency.collection.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 3
exports.Currencies = new meteor_rxjs_1.MongoObservable.Collection('currencies');                                       // 5
function loggedIn() {                                                                                                  // 7
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 9
exports.Currencies.allow({                                                                                             // 11
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=currency.collection.js.map                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"email-content.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/general/email-content.collection.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 3
exports.EmailContents = new meteor_rxjs_1.MongoObservable.Collection('email_contents');                                // 5
/**                                                                                                                    // 7
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 10
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 12
/**                                                                                                                    // 14
 * Allow EmailContents collecion insert and update functions                                                           //
 */                                                                                                                    //
exports.EmailContents.allow({                                                                                          // 17
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=email-content.collection.js.map                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"hours.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/general/hours.collection.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 3
exports.Hours = new meteor_rxjs_1.MongoObservable.Collection('hours');                                                 // 5
function loggedIn() {                                                                                                  // 7
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 9
exports.Hours.allow({                                                                                                  // 11
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=hours.collection.js.map                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"parameter.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/general/parameter.collection.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 3
exports.Parameters = new meteor_rxjs_1.MongoObservable.Collection('parameters');                                       // 5
function loggedIn() {                                                                                                  // 7
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 9
exports.Parameters.allow({                                                                                             // 11
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=parameter.collection.js.map                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"paymentMethod.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/general/paymentMethod.collection.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 3
exports.PaymentMethods = new meteor_rxjs_1.MongoObservable.Collection('paymentMethods');                               // 5
function loggedIn() {                                                                                                  // 7
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 9
exports.PaymentMethods.allow({                                                                                         // 11
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=paymentMethod.collection.js.map                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"queue.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/general/queue.collection.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 3
/**                                                                                                                    // 5
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 8
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 10
/**                                                                                                                    // 12
 * Queues Collection                                                                                                   //
 */                                                                                                                    //
exports.Queues = new meteor_rxjs_1.MongoObservable.Collection('queues');                                               // 15
/**                                                                                                                    // 17
 * Allow Queues collection insert and update functions                                                                 //
 */                                                                                                                    //
exports.Queues.allow({                                                                                                 // 20
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=queue.collection.js.map                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"payment":{"cc-payment-methods.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/payment/cc-payment-methods.collection.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 2
exports.CcPaymentMethods = new meteor_rxjs_1.MongoObservable.Collection('cc_payment_methods');                         // 5
/**                                                                                                                    // 7
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 10
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 12
/**                                                                                                                    // 14
 * Allow HistoryPaymentCollection collecion insert and update functions                                                //
 */                                                                                                                    //
exports.CcPaymentMethods.allow({                                                                                       // 17
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=cc-payment-methods.collection.js.map                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"payment-history.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/payment/payment-history.collection.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 2
exports.PaymentsHistory = new meteor_rxjs_1.MongoObservable.Collection('payments_history');                            // 5
/**                                                                                                                    // 7
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 10
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 12
/**                                                                                                                    // 14
 * Allow HistoryPaymentCollection collecion insert and update functions                                                //
 */                                                                                                                    //
exports.PaymentsHistory.allow({                                                                                        // 17
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=payment-history.collection.js.map                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"payment-transaction.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/payment/payment-transaction.collection.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 2
exports.PaymentTransactions = new meteor_rxjs_1.MongoObservable.Collection('payment_transaction');                     // 5
/**                                                                                                                    // 7
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 10
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 12
/**                                                                                                                    // 14
 * Allow HistoryPaymentCollection collecion insert and update functions                                                //
 */                                                                                                                    //
exports.PaymentTransactions.allow({                                                                                    // 17
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=payment-transaction.collection.js.map                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"restaurant":{"account.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/restaurant/account.collection.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 2
/**                                                                                                                    // 5
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 8
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 10
/**                                                                                                                    // 12
 * Accounts Collection                                                                                                 //
 */                                                                                                                    //
exports.Accounts = new meteor_rxjs_1.MongoObservable.Collection('accounts');                                           // 15
/**                                                                                                                    // 17
 * Allow Accounts collection insert and update functions                                                               //
 */                                                                                                                    //
exports.Accounts.allow({                                                                                               // 20
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=account.collection.js.map                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"invoice.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/restaurant/invoice.collection.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 2
/**                                                                                                                    // 5
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 8
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 10
/**                                                                                                                    // 12
 * Invoices Collection                                                                                                 //
 */                                                                                                                    //
exports.Invoices = new meteor_rxjs_1.MongoObservable.Collection('invoices');                                           // 15
/**                                                                                                                    // 17
 * Allow Invoices collection insert and update functions                                                               //
 */                                                                                                                    //
exports.Invoices.allow({                                                                                               // 20
    insert: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=invoice.collection.js.map                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"order.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/restaurant/order.collection.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 2
/**                                                                                                                    // 5
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 8
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 10
/**                                                                                                                    // 12
 * Orders Collection                                                                                                   //
 */                                                                                                                    //
exports.Orders = new meteor_rxjs_1.MongoObservable.Collection('orders');                                               // 15
/**                                                                                                                    // 17
 * Allow Orders collection insert and update functions                                                                 //
 */                                                                                                                    //
exports.Orders.allow({                                                                                                 // 20
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=order.collection.js.map                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"payment.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/restaurant/payment.collection.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 2
/**                                                                                                                    // 5
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 8
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 10
/**                                                                                                                    // 12
 * Payments Collection                                                                                                 //
 */                                                                                                                    //
exports.Payments = new meteor_rxjs_1.MongoObservable.Collection('payments');                                           // 15
/**                                                                                                                    // 17
 * Allow Payments collection insert and update functions                                                               //
 */                                                                                                                    //
exports.Payments.allow({                                                                                               // 20
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=payment.collection.js.map                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"restaurant.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/restaurant/restaurant.collection.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 3
/**                                                                                                                    // 5
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 8
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 10
/**                                                                                                                    // 12
 * Restaurants Collection                                                                                              //
 */                                                                                                                    //
exports.Restaurants = new meteor_rxjs_1.MongoObservable.Collection('restaurants');                                     // 15
/**                                                                                                                    // 17
 * Allow Restaurant collecion insert and update functions                                                              //
 */                                                                                                                    //
exports.Restaurants.allow({                                                                                            // 20
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
/**                                                                                                                    // 25
 * Restaurant Image Thumbs Collection                                                                                  //
 */                                                                                                                    //
exports.RestaurantImageThumbs = new meteor_rxjs_1.MongoObservable.Collection('restaurantImageThumbs');                 // 28
/**                                                                                                                    // 30
 * Allow Restaurant Image Thumbs Collection insert, update and remove functions                                        //
 */                                                                                                                    //
exports.RestaurantImageThumbs.allow({                                                                                  // 33
    insert: loggedIn,                                                                                                  //
    update: loggedIn,                                                                                                  //
    remove: loggedIn                                                                                                   //
});                                                                                                                    //
/**                                                                                                                    // 39
 * Restaurant Images Collection                                                                                        //
 */                                                                                                                    //
exports.RestaurantImages = new meteor_rxjs_1.MongoObservable.Collection('restaurantImages');                           // 42
/**                                                                                                                    // 44
 * Allow Restaurant Images collection insert, update and remove functions                                              //
 */                                                                                                                    //
exports.RestaurantImages.allow({                                                                                       // 47
    insert: loggedIn,                                                                                                  //
    update: loggedIn,                                                                                                  //
    remove: loggedIn                                                                                                   //
});                                                                                                                    //
/**                                                                                                                    // 53
 * Restaurants Collection                                                                                              //
 */                                                                                                                    //
exports.RestaurantTurns = new meteor_rxjs_1.MongoObservable.Collection('restaurant_turns');                            // 57
/**                                                                                                                    // 59
 * Allow Restaurant Turns collection insert and update functions                                                       //
 */                                                                                                                    //
exports.RestaurantTurns.allow({                                                                                        // 62
    insert: loggedIn,                                                                                                  //
    update: loggedIn,                                                                                                  //
    remove: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=restaurant.collection.js.map                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"table.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/restaurant/table.collection.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 3
/**                                                                                                                    // 5
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 8
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 10
/**                                                                                                                    // 12
 * Tables Collection                                                                                                   //
 */                                                                                                                    //
exports.Tables = new meteor_rxjs_1.MongoObservable.Collection('tables');                                               // 15
/**                                                                                                                    // 17
 * Allow Tables collection insert and update functions                                                                 //
 */                                                                                                                    //
exports.Tables.allow({                                                                                                 // 20
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=table.collection.js.map                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"waiter-call-detail.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/restaurant/waiter-call-detail.collection.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 3
/**                                                                                                                    // 5
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 8
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 10
/**                                                                                                                    // 12
 * WaiterCallDetails Collection                                                                                        //
 */                                                                                                                    //
exports.WaiterCallDetails = new meteor_rxjs_1.MongoObservable.Collection('waiter_call_details');                       // 15
/**                                                                                                                    // 17
 * Allow WaiterCallDetails collection insert and update functions                                                      //
 */                                                                                                                    //
exports.WaiterCallDetails.allow({                                                                                      // 20
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=waiter-call-detail.collection.js.map                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"settings":{"city.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/settings/city.collection.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 3
/**                                                                                                                    // 5
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 8
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 10
/**                                                                                                                    // 12
 * Cities Collection                                                                                                   //
 */                                                                                                                    //
exports.Cities = new meteor_rxjs_1.MongoObservable.Collection('cities');                                               // 15
/**                                                                                                                    // 17
 * Allow Cities collection insert and update functions                                                                 //
 */                                                                                                                    //
exports.Cities.allow({                                                                                                 // 20
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=city.collection.js.map                                                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"country.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/settings/country.collection.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 3
/**                                                                                                                    // 5
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 8
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 10
/**                                                                                                                    // 12
 * Countries Collection                                                                                                //
 */                                                                                                                    //
exports.Countries = new meteor_rxjs_1.MongoObservable.Collection('countries');                                         // 15
/**                                                                                                                    // 17
 * Allow Countries collection insert and update functions                                                              //
 */                                                                                                                    //
exports.Countries.allow({                                                                                              // 20
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=country.collection.js.map                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"language.collection.js":["meteor-rxjs","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/collections/settings/language.collection.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_rxjs_1 = require("meteor-rxjs");                                                                            // 1
var meteor_1 = require("meteor/meteor");                                                                               // 3
/**                                                                                                                    // 5
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 8
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 10
/**                                                                                                                    // 12
 * Languages Collection                                                                                                //
 */                                                                                                                    //
exports.Languages = new meteor_rxjs_1.MongoObservable.Collection('languages');                                         // 15
/**                                                                                                                    // 17
 * Allow Languages collection insert and update functions                                                              //
 */                                                                                                                    //
exports.Languages.allow({                                                                                              // 20
    insert: loggedIn,                                                                                                  //
    update: loggedIn                                                                                                   //
});                                                                                                                    //
//# sourceMappingURL=language.collection.js.map                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"models":{"administration":{"addition.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/administration/addition.model.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=addition.model.js.map                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"category.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/administration/category.model.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=category.model.js.map                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"garnish-food.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/administration/garnish-food.model.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=garnish-food.model.js.map                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"item.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/administration/item.model.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=item.model.js.map                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"menu.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/administration/menu.model.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=menu.model.js.map                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"promotion.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/administration/promotion.model.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=promotion.model.js.map                                                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"section.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/administration/section.model.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=section.model.js.map                                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"subcategory.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/administration/subcategory.model.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=subcategory.model.js.map                                                                          //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"auth":{"device.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/auth/device.model.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var Device = (function () {                                                                                            // 8
    function Device() {                                                                                                //
    }                                                                                                                  //
    return Device;                                                                                                     //
}());                                                                                                                  // 11
exports.Device = Device;                                                                                               // 8
//# sourceMappingURL=device.model.js.map                                                                               //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"menu.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/auth/menu.model.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=menu.model.js.map                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"role.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/auth/role.model.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=role.model.js.map                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"user-detail.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/auth/user-detail.model.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=user-detail.model.js.map                                                                          //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"user-profile.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/auth/user-profile.model.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
/**                                                                                                                    // 3
 * User Profile Model                                                                                                  //
 */                                                                                                                    //
var UserProfile = (function () {                                                                                       // 6
    function UserProfile() {                                                                                           //
    }                                                                                                                  //
    return UserProfile;                                                                                                //
}());                                                                                                                  // 10
exports.UserProfile = UserProfile;                                                                                     // 6
/**                                                                                                                    // 12
 * User Profile Image Model                                                                                            //
 */                                                                                                                    //
var UserProfileImage = (function () {                                                                                  // 15
    function UserProfileImage() {                                                                                      //
    }                                                                                                                  //
    return UserProfileImage;                                                                                           //
}());                                                                                                                  // 29
exports.UserProfileImage = UserProfileImage;                                                                           // 15
//# sourceMappingURL=user-profile.model.js.map                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"user.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/auth/user.model.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=user.model.js.map                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"general":{"currency.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/general/currency.model.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=currency.model.js.map                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"email-content.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/general/email-content.model.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=email-content.model.js.map                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"hour.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/general/hour.model.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=hour.model.js.map                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"parameter.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/general/parameter.model.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=parameter.model.js.map                                                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"paymentMethod.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/general/paymentMethod.model.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=paymentMethod.model.js.map                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"queue.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/general/queue.model.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=queue.model.js.map                                                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"payment":{"cc-payment-method.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/payment/cc-payment-method.model.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=cc-payment-method.model.js.map                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cc-request-colombia.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/payment/cc-request-colombia.model.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
/**                                                                                                                    // 1
 * CcRequestColombia model                                                                                             //
 */                                                                                                                    //
var CcRequestColombia = (function () {                                                                                 // 4
    function CcRequestColombia() {                                                                                     //
    }                                                                                                                  //
    return CcRequestColombia;                                                                                          //
}());                                                                                                                  // 10
exports.CcRequestColombia = CcRequestColombia;                                                                         // 4
/**                                                                                                                    // 12
 * Merchant model                                                                                                      //
 */                                                                                                                    //
var Merchant = (function () {                                                                                          // 15
    function Merchant() {                                                                                              //
    }                                                                                                                  //
    return Merchant;                                                                                                   //
}());                                                                                                                  // 18
exports.Merchant = Merchant;                                                                                           // 15
/**                                                                                                                    // 20
 * Transaction model                                                                                                   //
 */                                                                                                                    //
var Transaction = (function () {                                                                                       // 23
    function Transaction() {                                                                                           //
    }                                                                                                                  //
    return Transaction;                                                                                                //
}());                                                                                                                  // 35
exports.Transaction = Transaction;                                                                                     // 23
/**                                                                                                                    // 37
 * Order model                                                                                                         //
 */                                                                                                                    //
var Order = (function () {                                                                                             // 40
    function Order() {                                                                                                 //
    }                                                                                                                  //
    return Order;                                                                                                      //
}());                                                                                                                  // 50
exports.Order = Order;                                                                                                 // 40
/**                                                                                                                    // 52
 * Payer model                                                                                                         //
 */                                                                                                                    //
var Payer = (function () {                                                                                             // 55
    function Payer() {                                                                                                 //
    }                                                                                                                  //
    return Payer;                                                                                                      //
}());                                                                                                                  // 62
exports.Payer = Payer;                                                                                                 // 55
/**                                                                                                                    // 64
 * CreditCard model                                                                                                    //
 */                                                                                                                    //
var CreditCard = (function () {                                                                                        // 67
    function CreditCard() {                                                                                            //
    }                                                                                                                  //
    return CreditCard;                                                                                                 //
}());                                                                                                                  // 72
exports.CreditCard = CreditCard;                                                                                       // 67
/**                                                                                                                    // 74
 * ExtraParameters model                                                                                               //
 */                                                                                                                    //
var ExtraParameters = (function () {                                                                                   // 77
    function ExtraParameters() {                                                                                       //
    }                                                                                                                  //
    return ExtraParameters;                                                                                            //
}());                                                                                                                  // 80
exports.ExtraParameters = ExtraParameters;                                                                             // 77
/**                                                                                                                    // 82
 * AdditionalValues model                                                                                              //
 */                                                                                                                    //
var AdditionalValues = (function () {                                                                                  // 85
    function AdditionalValues() {                                                                                      //
    }                                                                                                                  //
    return AdditionalValues;                                                                                           //
}());                                                                                                                  // 89
exports.AdditionalValues = AdditionalValues;                                                                           // 85
/**                                                                                                                    // 91
 * TX_VALUE model                                                                                                      //
 */                                                                                                                    //
var TX_VALUE = (function () {                                                                                          // 94
    function TX_VALUE() {                                                                                              //
    }                                                                                                                  //
    return TX_VALUE;                                                                                                   //
}());                                                                                                                  // 97
exports.TX_VALUE = TX_VALUE;                                                                                           // 94
/**                                                                                                                    // 99
 * TX_TAX model                                                                                                        //
 */                                                                                                                    //
var TX_TAX = (function () {                                                                                            // 102
    function TX_TAX() {                                                                                                //
    }                                                                                                                  //
    return TX_TAX;                                                                                                     //
}());                                                                                                                  // 105
exports.TX_TAX = TX_TAX;                                                                                               // 102
/**                                                                                                                    // 107
 * TX_TAX_RETURN_BASE model                                                                                            //
 */                                                                                                                    //
var TX_TAX_RETURN_BASE = (function () {                                                                                // 110
    function TX_TAX_RETURN_BASE() {                                                                                    //
    }                                                                                                                  //
    return TX_TAX_RETURN_BASE;                                                                                         //
}());                                                                                                                  // 113
exports.TX_TAX_RETURN_BASE = TX_TAX_RETURN_BASE;                                                                       // 110
/**                                                                                                                    // 115
 * Buyer model                                                                                                         //
 */                                                                                                                    //
var Buyer = (function () {                                                                                             // 118
    function Buyer() {                                                                                                 //
    }                                                                                                                  //
    return Buyer;                                                                                                      //
}());                                                                                                                  // 125
exports.Buyer = Buyer;                                                                                                 // 118
/**                                                                                                                    // 127
 * ShippingBillingAddress                                                                                              //
 */                                                                                                                    //
var ShippingBillingAddress = (function () {                                                                            // 130
    function ShippingBillingAddress() {                                                                                //
    }                                                                                                                  //
    return ShippingBillingAddress;                                                                                     //
}());                                                                                                                  // 138
exports.ShippingBillingAddress = ShippingBillingAddress;                                                               // 130
//# sourceMappingURL=cc-request-colombia.model.js.map                                                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"payment-history.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/payment/payment-history.model.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=payment-history.model.js.map                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"payment-transaction.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/payment/payment-transaction.model.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=payment-transaction.model.js.map                                                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"response-query.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/payment/response-query.model.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
/**                                                                                                                    // 1
 * ResponseQuery model                                                                                                 //
 */                                                                                                                    //
var ResponseQuery = (function () {                                                                                     // 4
    function ResponseQuery() {                                                                                         //
    }                                                                                                                  //
    return ResponseQuery;                                                                                              //
}());                                                                                                                  // 10
exports.ResponseQuery = ResponseQuery;                                                                                 // 4
/**                                                                                                                    // 12
 * Merchant model                                                                                                      //
 */                                                                                                                    //
var Merchant = (function () {                                                                                          // 15
    function Merchant() {                                                                                              //
    }                                                                                                                  //
    return Merchant;                                                                                                   //
}());                                                                                                                  // 18
exports.Merchant = Merchant;                                                                                           // 15
/**                                                                                                                    // 20
 * Details model                                                                                                       //
 */                                                                                                                    //
var Details = (function () {                                                                                           // 23
    function Details() {                                                                                               //
    }                                                                                                                  //
    return Details;                                                                                                    //
}());                                                                                                                  // 25
exports.Details = Details;                                                                                             // 23
//# sourceMappingURL=response-query.model.js.map                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"restaurant":{"account.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/restaurant/account.model.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=account.model.js.map                                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"invoice.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/restaurant/invoice.model.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=invoice.model.js.map                                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"node.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/restaurant/node.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var Node = (function () {                                                                                              // 1
    function Node() {                                                                                                  //
    }                                                                                                                  //
    Node.prototype.createNode = function (_pChars) {                                                                   //
        this.frecuency = 1;                                                                                            //
        this.chars = _pChars;                                                                                          //
    };                                                                                                                 //
    Node.prototype.createNodeExtend = function (_pFrecuency, _pChars, _pLeft, _pRight) {                               //
        this.frecuency = _pFrecuency;                                                                                  //
        this.chars = _pChars;                                                                                          //
        this.nodeLeft = _pLeft;                                                                                        //
        this.nodeRight = _pRight;                                                                                      //
    };                                                                                                                 //
    Node.prototype.getChar = function () {                                                                             //
        return this.chars;                                                                                             //
    };                                                                                                                 //
    Node.prototype.setChar = function (_pChar) {                                                                       //
        this.chars = _pChar;                                                                                           //
    };                                                                                                                 //
    Node.prototype.getFrecuency = function () {                                                                        //
        return this.frecuency;                                                                                         //
    };                                                                                                                 //
    Node.prototype.setFrecuency = function (_pFrecuency) {                                                             //
        this.frecuency = _pFrecuency;                                                                                  //
    };                                                                                                                 //
    Node.prototype.getNodeLeft = function () {                                                                         //
        return this.nodeLeft;                                                                                          //
    };                                                                                                                 //
    Node.prototype.setNodeLeft = function (_pLeft) {                                                                   //
        this.nodeLeft = _pLeft;                                                                                        //
    };                                                                                                                 //
    Node.prototype.getNodeRight = function () {                                                                        //
        return this.nodeRight;                                                                                         //
    };                                                                                                                 //
    Node.prototype.setNodeRight = function (_pNodeRight) {                                                             //
        this.nodeRight = _pNodeRight;                                                                                  //
    };                                                                                                                 //
    return Node;                                                                                                       //
}());                                                                                                                  // 50
exports.Node = Node;                                                                                                   // 1
//# sourceMappingURL=node.js.map                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"order.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/restaurant/order.model.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=order.model.js.map                                                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"payment.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/restaurant/payment.model.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=payment.model.js.map                                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"restaurant.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/restaurant/restaurant.model.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
;                                                                                                                      // 106
//# sourceMappingURL=restaurant.model.js.map                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"table.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/restaurant/table.model.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=table.model.js.map                                                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"waiter-call-detail.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/restaurant/waiter-call-detail.model.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=waiter-call-detail.model.js.map                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"settings":{"city.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/settings/city.model.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=city.model.js.map                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"country.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/settings/country.model.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=country.model.js.map                                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"language.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/settings/language.model.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=language.model.js.map                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collection-object.model.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/models/collection-object.model.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
//# sourceMappingURL=collection-object.model.js.map                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"stores":{"administration":{"item.store.js":["meteor/jalik:ufs","/both/collections/administration/item.collection","gm",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/stores/administration/item.store.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var jalik_ufs_1 = require("meteor/jalik:ufs");                                                                         // 1
var item_collection_1 = require("/both/collections/administration/item.collection");                                   // 2
/**                                                                                                                    // 4
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 7
    return !!Meteor.user();                                                                                            //
}                                                                                                                      // 9
/**                                                                                                                    // 11
 * Create store to item image thumbs                                                                                   //
 */                                                                                                                    //
exports.ItemImageThumbsStore = new jalik_ufs_1.UploadFS.store.GridFS({                                                 // 14
    collection: item_collection_1.ItemImagesThumbs.collection,                                                         //
    name: 'itemImageThumbsStore',                                                                                      //
    permissions: new jalik_ufs_1.UploadFS.StorePermissions({                                                           //
        insert: loggedIn,                                                                                              //
        update: loggedIn,                                                                                              //
        remove: loggedIn                                                                                               //
    }),                                                                                                                //
    transformWrite: function (from, to, fileId, file) {                                                                //
        // Resize to 100x100                                                                                           //
        //var require: any;                                                                                            //
        var gm = require('gm');                                                                                        //
        gm(from, file.name)                                                                                            //
            .resize(100, 100, "!")                                                                                     //
            .gravity('Center')                                                                                         //
            .extent(100, 100)                                                                                          //
            .quality(75)                                                                                               //
            .stream()                                                                                                  //
            .pipe(to);                                                                                                 //
    }                                                                                                                  //
});                                                                                                                    //
/**                                                                                                                    // 38
 * Create store to Item images                                                                                         //
 */                                                                                                                    //
exports.ItemImagesStore = new jalik_ufs_1.UploadFS.store.GridFS({                                                      // 41
    collection: item_collection_1.ItemImages.collection,                                                               //
    name: 'itemImagesStore',                                                                                           //
    filter: new jalik_ufs_1.UploadFS.Filter({                                                                          //
        contentTypes: ['image/*'],                                                                                     //
        minSize: 1,                                                                                                    //
        maxSize: 1024 * 1000,                                                                                          //
        extensions: ['jpg', 'png', 'jpeg']                                                                             //
    }),                                                                                                                //
    copyTo: [                                                                                                          //
        exports.ItemImageThumbsStore                                                                                   //
    ],                                                                                                                 //
    permissions: new jalik_ufs_1.UploadFS.StorePermissions({                                                           //
        insert: loggedIn,                                                                                              //
        update: loggedIn,                                                                                              //
        remove: loggedIn                                                                                               //
    }),                                                                                                                //
    transformWrite: function (from, to, fileId, file) {                                                                //
        // Resize to 500x500                                                                                           //
        //var require: any;                                                                                            //
        var gm = require('gm');                                                                                        //
        gm(from, file.name)                                                                                            //
            .resize(500, 500, "!")                                                                                     //
            .gravity('Center')                                                                                         //
            .extent(500, 500)                                                                                          //
            .quality(75)                                                                                               //
            .stream()                                                                                                  //
            .pipe(to);                                                                                                 //
    }                                                                                                                  //
});                                                                                                                    //
//# sourceMappingURL=item.store.js.map                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"promotion.store.js":["meteor/jalik:ufs","/both/collections/administration/promotion.collection","gm",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/stores/administration/promotion.store.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var jalik_ufs_1 = require("meteor/jalik:ufs");                                                                         // 1
var promotion_collection_1 = require("/both/collections/administration/promotion.collection");                         // 2
/**                                                                                                                    // 4
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 7
    return !!Meteor.user();                                                                                            //
}                                                                                                                      // 9
/**                                                                                                                    // 11
 * Create store to promotion image thumbs                                                                              //
 */                                                                                                                    //
exports.PromotionImageThumbsStore = new jalik_ufs_1.UploadFS.store.GridFS({                                            // 14
    collection: promotion_collection_1.PromotionImagesThumbs.collection,                                               //
    name: 'promotionImageThumbsStore',                                                                                 //
    permissions: new jalik_ufs_1.UploadFS.StorePermissions({                                                           //
        insert: loggedIn,                                                                                              //
        update: loggedIn,                                                                                              //
        remove: loggedIn                                                                                               //
    }),                                                                                                                //
    transformWrite: function (from, to, fileId, file) {                                                                //
        // Resize to 100x100                                                                                           //
        var gm = require('gm');                                                                                        //
        gm(from, file.name)                                                                                            //
            .resize(100, 100, "!")                                                                                     //
            .gravity('Center')                                                                                         //
            .extent(100, 100)                                                                                          //
            .quality(75)                                                                                               //
            .stream()                                                                                                  //
            .pipe(to);                                                                                                 //
    }                                                                                                                  //
});                                                                                                                    //
/**                                                                                                                    // 36
* Create store to promotion images                                                                                     //
*/                                                                                                                     //
exports.PromotionImagesStore = new jalik_ufs_1.UploadFS.store.GridFS({                                                 // 39
    collection: promotion_collection_1.PromotionImages.collection,                                                     //
    name: 'promotionImagesStore',                                                                                      //
    filter: new jalik_ufs_1.UploadFS.Filter({                                                                          //
        contentTypes: ['image/*'],                                                                                     //
        minSize: 1,                                                                                                    //
        maxSize: 1024 * 1000,                                                                                          //
        extensions: ['jpg', 'png', 'jpeg']                                                                             //
    }),                                                                                                                //
    copyTo: [                                                                                                          //
        exports.PromotionImageThumbsStore                                                                              //
    ],                                                                                                                 //
    permissions: new jalik_ufs_1.UploadFS.StorePermissions({                                                           //
        insert: loggedIn,                                                                                              //
        update: loggedIn,                                                                                              //
        remove: loggedIn                                                                                               //
    }),                                                                                                                //
    transformWrite: function (from, to, fileId, file) {                                                                //
        // Resize to 500x500                                                                                           //
        var gm = require('gm');                                                                                        //
        gm(from, file.name)                                                                                            //
            .resize(500, 500, "!")                                                                                     //
            .gravity('Center')                                                                                         //
            .extent(500, 500)                                                                                          //
            .quality(75)                                                                                               //
            .stream()                                                                                                  //
            .pipe(to);                                                                                                 //
    }                                                                                                                  //
});                                                                                                                    //
//# sourceMappingURL=promotion.store.js.map                                                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"auth":{"user.store.js":["meteor/jalik:ufs","/both/collections/auth/user.collection","gm",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/stores/auth/user.store.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var jalik_ufs_1 = require("meteor/jalik:ufs");                                                                         // 1
var user_collection_1 = require("/both/collections/auth/user.collection");                                             // 2
/**                                                                                                                    // 4
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 7
    return !!Meteor.user();                                                                                            //
}                                                                                                                      // 9
/**                                                                                                                    // 11
 * Create store to User images                                                                                         //
 */                                                                                                                    //
exports.UserImagesStore = new jalik_ufs_1.UploadFS.store.GridFS({                                                      // 14
    collection: user_collection_1.UserImages.collection,                                                               //
    name: 'userImagesStore',                                                                                           //
    filter: new jalik_ufs_1.UploadFS.Filter({                                                                          //
        contentTypes: ['image/*'],                                                                                     //
        minSize: 1,                                                                                                    //
        maxSize: 1024 * 1000,                                                                                          //
        extensions: ['jpg', 'png', 'jpeg']                                                                             //
    }),                                                                                                                //
    permissions: new jalik_ufs_1.UploadFS.StorePermissions({                                                           //
        insert: loggedIn,                                                                                              //
        update: loggedIn,                                                                                              //
        remove: loggedIn                                                                                               //
    }),                                                                                                                //
    transformWrite: function (from, to, fileId, file) {                                                                //
        // Resize to 150x150                                                                                           //
        //var require: any;                                                                                            //
        var gm = require('gm');                                                                                        //
        gm(from, file.name)                                                                                            //
            .resize(150, 150, "!")                                                                                     //
            .gravity('Center')                                                                                         //
            .extent(150, 150)                                                                                          //
            .quality(75)                                                                                               //
            .stream()                                                                                                  //
            .pipe(to);                                                                                                 //
    }                                                                                                                  //
});                                                                                                                    //
//# sourceMappingURL=user.store.js.map                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"restaurant":{"restaurant.store.js":["meteor/jalik:ufs","/both/collections/restaurant/restaurant.collection","meteor/meteor","gm",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both/stores/restaurant/restaurant.store.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var jalik_ufs_1 = require("meteor/jalik:ufs");                                                                         // 1
var restaurant_collection_1 = require("/both/collections/restaurant/restaurant.collection");                           // 2
var meteor_1 = require("meteor/meteor");                                                                               // 3
/**                                                                                                                    // 5
 * Function to validate if user exists                                                                                 //
 */                                                                                                                    //
function loggedIn() {                                                                                                  // 8
    return !!meteor_1.Meteor.user();                                                                                   //
}                                                                                                                      // 10
/**                                                                                                                    // 12
 * Create store to restaurant image thumbs                                                                             //
 */                                                                                                                    //
exports.RestaurantImageThumbsStore = new jalik_ufs_1.UploadFS.store.GridFS({                                           // 15
    collection: restaurant_collection_1.RestaurantImageThumbs.collection,                                              //
    name: 'restaurantImageThumbsStore',                                                                                //
    permissions: new jalik_ufs_1.UploadFS.StorePermissions({                                                           //
        insert: loggedIn,                                                                                              //
        update: loggedIn,                                                                                              //
        remove: loggedIn                                                                                               //
    }),                                                                                                                //
    transformWrite: function (from, to, fileId, file) {                                                                //
        // Resize to 100x100                                                                                           //
        var gm = require('gm');                                                                                        //
        gm(from, file.name)                                                                                            //
            .resize(100, 100, "!")                                                                                     //
            .gravity('Center')                                                                                         //
            .extent(100, 100)                                                                                          //
            .quality(75)                                                                                               //
            .stream()                                                                                                  //
            .pipe(to);                                                                                                 //
    }                                                                                                                  //
});                                                                                                                    //
/**                                                                                                                    // 38
* Create store to restaurant images                                                                                    //
*/                                                                                                                     //
exports.RestaurantImagesStore = new jalik_ufs_1.UploadFS.store.GridFS({                                                // 41
    collection: restaurant_collection_1.RestaurantImages.collection,                                                   //
    name: 'restaurantImagesStore',                                                                                     //
    filter: new jalik_ufs_1.UploadFS.Filter({                                                                          //
        contentTypes: ['image/*'],                                                                                     //
        minSize: 1,                                                                                                    //
        maxSize: 1024 * 1000,                                                                                          //
        extensions: ['jpg', 'png', 'jpeg']                                                                             //
    }),                                                                                                                //
    copyTo: [                                                                                                          //
        exports.RestaurantImageThumbsStore                                                                             //
    ],                                                                                                                 //
    permissions: new jalik_ufs_1.UploadFS.StorePermissions({                                                           //
        insert: loggedIn,                                                                                              //
        update: loggedIn,                                                                                              //
        remove: loggedIn                                                                                               //
    }),                                                                                                                //
    transformWrite: function (from, to, fileId, file) {                                                                //
        // Resize to 500x500                                                                                           //
        var gm = require('gm');                                                                                        //
        gm(from, file.name)                                                                                            //
            .resize(500, 500, "!")                                                                                     //
            .gravity('Center')                                                                                         //
            .extent(500, 500)                                                                                          //
            .quality(75)                                                                                               //
            .stream()                                                                                                  //
            .pipe(to);                                                                                                 //
    }                                                                                                                  //
});                                                                                                                    //
//# sourceMappingURL=restaurant.store.js.map                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}},"server":{"imports":{"fixtures":{"auth":{"account-creation.js":["meteor/accounts-base",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/fixtures/auth/account-creation.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var accounts_base_1 = require("meteor/accounts-base");                                                                 // 1
accounts_base_1.Accounts.onCreateUser(function (options, user) {                                                       // 3
    user.profile = options.profile || {};                                                                              //
    user.profile.first_name = options.profile.first_name;                                                              //
    user.profile.last_name = options.profile.last_name;                                                                //
    user.profile.language_code = options.profile.language_code;                                                        //
    // Returns the user object                                                                                         //
    return user;                                                                                                       //
});                                                                                                                    // 12
//# sourceMappingURL=account-creation.js.map                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"email-config.js":["meteor/accounts-base","meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/fixtures/auth/email-config.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var accounts_base_1 = require("meteor/accounts-base");                                                                 // 1
var meteor_1 = require("meteor/meteor");                                                                               // 2
var greetVar;                                                                                                          // 4
var welcomeMsgVar;                                                                                                     // 5
var btnTextVar;                                                                                                        // 6
var beforeMsgVar;                                                                                                      // 7
var regardVar;                                                                                                         // 8
var followMsgVar;                                                                                                      // 9
accounts_base_1.Accounts.urls.resetPassword = function (token) {                                                       // 11
    return meteor_1.Meteor.absoluteUrl('reset-password/' + token);                                                     //
};                                                                                                                     // 13
function checkLanguage(user) {                                                                                         // 16
    if (user.profile.language_code === 'en') {                                                                         //
        greetVar = "Hello ";                                                                                           //
        welcomeMsgVar = "We got a request to reset you password, if it was you click the button above.";               //
        btnTextVar = "Reset";                                                                                          //
        beforeMsgVar = "If you do not want to change the password, ignore this message.";                              //
        regardVar = "Thanks, Iurest team.";                                                                            //
        followMsgVar = "Follow us on social networks";                                                                 //
    }                                                                                                                  //
    if (user.profile.language_code === 'es') {                                                                         //
        greetVar = "Hola ";                                                                                            //
        welcomeMsgVar = "Hemos recibido una petición para cambiar tu contraseña, si fuiste tu haz click en el botón abajo";
        btnTextVar = "Cambiar";                                                                                        //
        beforeMsgVar = "Si no quieres cambiar la contraseña, ignora este mensaje.";                                    //
        regardVar = "Gracias, equipo Iurest";                                                                          //
        followMsgVar = "Siguenos en redes sociales";                                                                   //
    }                                                                                                                  //
}                                                                                                                      // 35
function greet() {                                                                                                     // 37
    return function (user, url) {                                                                                      //
        checkLanguage(user);                                                                                           //
        var greeting = (user.profile && user.profile.first_name) ? (greetVar + ' ' + user.profile.first_name + ",") : greetVar;
        return "\n               <table border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#f5f5f5\"><tbody><tr><td style=\"padding: 20px 0 30px 0;\"><table style=\"border-collapse: collapse; box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\" border=\"0\" width=\"60%\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tbody><tr><td style=\"padding: 10px 0 10px 0;\" align=\"center\" bgcolor=\"#E53935\"><img style=\"display: block;\" src=\"logo_iurest_white.png\" alt=\"Reset passwd\" /></td></tr><tr><td style=\"padding: 10px 30px 10px 30px;\" bgcolor=\"#ffffff\"><table border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td style=\"padding: 15px 0 0 0; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold;\">" + greeting + "</td></tr><tr><td style=\"padding: 15px 0 10px 0; font-family: Arial, sans-serif;\">" + welcomeMsgVar + "</td></tr><tr><td style=\"padding: 20px 0 20px 0; font-family: Arial, sans-serif;\"><div align=\"center\"><a style=\"background-color: #e53935; color: white; text-align: center; padding: 15px 30px; text-decoration: none;\" href=\"" + url + "\">" + btnTextVar + "</a></div></td></tr><tr><td style=\"padding: 0 0 0 0; font-family: Arial, sans-serif;\"><p>" + beforeMsgVar + " <br /> " + regardVar + "</p></td></tr></tbody></table></td></tr><tr><td style=\"padding: 0px 30px 10px 30px;\" bgcolor=\"#ffffff\"><hr /><table border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td style=\"font-family: Arial, sans-serif;\">" + followMsgVar + "</td><td align=\"right\"><table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td><a href=\"http://www.facebook.com/\"> <img style=\"display: block;\" src=\"https://s24.postimg.org/ddsjhe0id/facebook.png\" alt=\"Facebook\" /> </a></td><td style=\"font-size: 0; line-height: 0;\" width=\"20\">&nbsp;</td><td><a href=\"http://www.twitter.com/\"> <img style=\"display: block;\" src=\"https://s30.postimg.org/68qpc9wox/twitter.png\" alt=\"Twitter\" /> </a></td><td style=\"font-size: 0; line-height: 0;\" width=\"20\">&nbsp;</td><td><a href=\"http://www.google.com/\"> <img style=\"display: block;\" src=\"https://s28.postimg.org/wmdctg1cd/google.png\" alt=\"Facebook\" /> </a></td></tr></tbody></table></td></tr><tr><td style=\"font-family: Arial, sans-serif; padding: 10px 0 10px 0;\"><a style=\"font-family: Arial, sans-serif; text-decoration: none; float: left;\" href=\"https://www.iurest.com/\">https://www.iurest.com</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>\n               ";
    };                                                                                                                 //
}                                                                                                                      // 47
function greetText() {                                                                                                 // 49
    return function (user, url) {                                                                                      //
        checkLanguage(user);                                                                                           //
        var greeting = (user.profile && user.profile.first_name) ? (greetVar + user.profile.first_name + ",") : greetVar;
        return "    " + greeting + "\n                    " + welcomeMsgVar + "\n                    " + url + "\n                    " + beforeMsgVar + "\n                    " + regardVar + "\n               ";
    };                                                                                                                 //
}                                                                                                                      // 62
accounts_base_1.Accounts.emailTemplates = {                                                                            // 64
    from: "Iurest <no-reply@iurest.com>",                                                                              //
    siteName: meteor_1.Meteor.absoluteUrl().replace(/^https?:\/\//, '').replace(/\/$/, ''),                            //
    resetPassword: {                                                                                                   //
        subject: function (user) {                                                                                     //
            if (user.profile.language_code === 'en') {                                                                 //
                return "Reset your password on " + accounts_base_1.Accounts.emailTemplates.siteName;                   //
            }                                                                                                          //
            if (user.profile.language_code === 'es') {                                                                 //
                return "Cambio de contraseña en " + accounts_base_1.Accounts.emailTemplates.siteName;                  //
            }                                                                                                          //
        },                                                                                                             //
        html: greet(),                                                                                                 //
        text: greetText(),                                                                                             //
    },                                                                                                                 //
    verifyEmail: {                                                                                                     //
        subject: function (user) {                                                                                     //
            return "How to verify email address on " + accounts_base_1.Accounts.emailTemplates.siteName;               //
        },                                                                                                             //
        text: greet()                                                                                                  //
    },                                                                                                                 //
    enrollAccount: {                                                                                                   //
        subject: function (user) {                                                                                     //
            return "An account has been created for you on " + accounts_base_1.Accounts.emailTemplates.siteName;       //
        },                                                                                                             //
        text: greet()                                                                                                  //
    }                                                                                                                  //
};                                                                                                                     //
//# sourceMappingURL=email-config.js.map                                                                               //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"menus.js":["../../../../both/collections/auth/menu.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/fixtures/auth/menus.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var menu_collection_1 = require("../../../../both/collections/auth/menu.collection");                                  // 1
function loadMenus() {                                                                                                 // 4
    if (menu_collection_1.Menus.find().cursor.count() === 0) {                                                         //
        var menus = [                                                                                                  //
            {                                                                                                          //
                _id: "900",                                                                                            //
                is_active: true,                                                                                       //
                name: "MENUS.DASHBOARD.DASHBOARD",                                                                     //
                url: "/app/dashboard",                                                                                 //
                icon_name: "trending up",                                                                              //
                order: 900                                                                                             //
            },                                                                                                         //
            {                                                                                                          //
                _id: "910",                                                                                            //
                is_active: true,                                                                                       //
                name: "MENUS.DASHBOARD.DASHBOARD",                                                                     //
                url: "/app/dashboards",                                                                                //
                icon_name: "trending up",                                                                              //
                order: 910                                                                                             //
            },                                                                                                         //
            {                                                                                                          //
                _id: "1000",                                                                                           //
                is_active: true,                                                                                       //
                name: "MENUS.ADMINISTRATION.MANAGEMENT",                                                               //
                url: "",                                                                                               //
                icon_name: "supervisor account",                                                                       //
                order: 1000,                                                                                           //
                children: [                                                                                            //
                    {                                                                                                  //
                        _id: "1001",                                                                                   //
                        is_active: true,                                                                               //
                        name: "MENUS.ADMINISTRATION.RESTAURANTS",                                                      //
                        url: "/app/restaurant",                                                                        //
                        icon_name: "",                                                                                 //
                        order: 1001                                                                                    //
                    }, {                                                                                               //
                        _id: "1002",                                                                                   //
                        is_active: true,                                                                               //
                        name: "MENUS.ADMINISTRATION.TABLES",                                                           //
                        url: "/app/tables",                                                                            //
                        icon_name: "",                                                                                 //
                        order: 1002                                                                                    //
                    }, {                                                                                               //
                        _id: "1003",                                                                                   //
                        is_active: true,                                                                               //
                        name: "MENUS.ADMINISTRATION.COLLABORATORS",                                                    //
                        url: "/app/collaborators",                                                                     //
                        icon_name: "",                                                                                 //
                        order: 1003                                                                                    //
                    }, {                                                                                               //
                        _id: "1004",                                                                                   //
                        is_active: true,                                                                               //
                        name: "MENUS.ADMINISTRATION.MONTHLY_CONFIG",                                                   //
                        url: "/app/monthly-config",                                                                    //
                        icon_name: "",                                                                                 //
                        order: 1004                                                                                    //
                    }                                                                                                  //
                ]                                                                                                      //
            },                                                                                                         //
            {                                                                                                          //
                _id: "1100",                                                                                           //
                is_active: true,                                                                                       //
                name: "MENUS.ADMINISTRATION.COLLABORATORS",                                                            //
                url: "/app/collaborators",                                                                             //
                icon_name: "supervisor account",                                                                       //
                order: 1100                                                                                            //
            },                                                                                                         //
            {                                                                                                          //
                _id: "2000",                                                                                           //
                is_active: true,                                                                                       //
                name: "MENUS.PAYMENTS.PAYMENTS",                                                                       //
                url: "",                                                                                               //
                icon_name: "payment",                                                                                  //
                order: 2000,                                                                                           //
                children: [                                                                                            //
                    {                                                                                                  //
                        _id: "2001",                                                                                   //
                        is_active: true,                                                                               //
                        name: "MENUS.PAYMENTS.MONTHLY_PAYMENT",                                                        //
                        url: "/app/monthly-payment",                                                                   //
                        icon_name: "",                                                                                 //
                        order: 2001                                                                                    //
                    },                                                                                                 //
                    {                                                                                                  //
                        _id: "2002",                                                                                   //
                        is_active: true,                                                                               //
                        name: "MENUS.PAYMENTS.PAYMENT_HISTORY",                                                        //
                        url: "/app/payment-history",                                                                   //
                        icon_name: "",                                                                                 //
                        order: 2002                                                                                    //
                    },                                                                                                 //
                    {                                                                                                  //
                        _id: "2003",                                                                                   //
                        is_active: true,                                                                               //
                        name: "MENUS.PAYMENTS.REACTIVATE_RESTAURANT",                                                  //
                        url: "/app/reactivate-restaurant",                                                             //
                        icon_name: "",                                                                                 //
                        order: 2003                                                                                    //
                    }                                                                                                  //
                ]                                                                                                      //
            },                                                                                                         //
            {                                                                                                          //
                _id: "3000",                                                                                           //
                is_active: true,                                                                                       //
                name: "MENUS.MENU_DEFINITION.MENU_DEFINITION",                                                         //
                url: "",                                                                                               //
                icon_name: "list",                                                                                     //
                order: 3000,                                                                                           //
                children: [                                                                                            //
                    {                                                                                                  //
                        _id: "3001",                                                                                   //
                        is_active: true,                                                                               //
                        name: "MENUS.MENU_DEFINITION.SECTIONS",                                                        //
                        url: "/app/sections",                                                                          //
                        icon_name: "",                                                                                 //
                        order: 3001                                                                                    //
                    }, {                                                                                               //
                        _id: "3002",                                                                                   //
                        is_active: true,                                                                               //
                        name: "MENUS.MENU_DEFINITION.CATEGORIES",                                                      //
                        url: "/app/categories",                                                                        //
                        icon_name: "",                                                                                 //
                        order: 3002                                                                                    //
                    }, {                                                                                               //
                        _id: "3003",                                                                                   //
                        is_active: true,                                                                               //
                        name: "MENUS.MENU_DEFINITION.SUBCATEGORIES",                                                   //
                        url: "/app/subcategories",                                                                     //
                        icon_name: "",                                                                                 //
                        order: 3003                                                                                    //
                    }, {                                                                                               //
                        _id: "3004",                                                                                   //
                        is_active: true,                                                                               //
                        name: "MENUS.MENU_DEFINITION.ADDITIONS",                                                       //
                        url: "/app/additions",                                                                         //
                        icon_name: "",                                                                                 //
                        order: 3004                                                                                    //
                    }, {                                                                                               //
                        _id: "3005",                                                                                   //
                        is_active: true,                                                                               //
                        name: "MENUS.MENU_DEFINITION.GARNISHFOOD",                                                     //
                        url: "/app/garnishFood",                                                                       //
                        icon_name: "",                                                                                 //
                        order: 3005                                                                                    //
                    }, {                                                                                               //
                        _id: "3006",                                                                                   //
                        is_active: true,                                                                               //
                        name: "MENUS.MENU_DEFINITION.ITEMS",                                                           //
                        url: "/app/items",                                                                             //
                        icon_name: "",                                                                                 //
                        order: 3006                                                                                    //
                    }, {                                                                                               //
                        _id: "3007",                                                                                   //
                        is_active: true,                                                                               //
                        name: "MENUS.MENU_DEFINITION.ITEMS_ENABLE",                                                    //
                        url: "/app/items-enable",                                                                      //
                        icon_name: "",                                                                                 //
                        order: 3007                                                                                    //
                    }                                                                                                  //
                ]                                                                                                      //
            },                                                                                                         //
            {                                                                                                          //
                _id: "3100",                                                                                           //
                is_active: true,                                                                                       //
                name: "MENUS.MENU_DEFINITION.ITEMS_ENABLE",                                                            //
                url: "/app/items-enable-sup",                                                                          //
                icon_name: "done all",                                                                                 //
                order: 3100                                                                                            //
            },                                                                                                         //
            {                                                                                                          //
                _id: "4000",                                                                                           //
                is_active: true,                                                                                       //
                name: "MENUS.ORDERS",                                                                                  //
                url: "/app/orders",                                                                                    //
                icon_name: "dns",                                                                                      //
                order: 4000                                                                                            //
            },                                                                                                         //
            {                                                                                                          //
                _id: "5000",                                                                                           //
                is_active: true,                                                                                       //
                name: "MENUS.PAYMENTS",                                                                                //
                url: "/app/payments",                                                                                  //
                icon_name: "local_atm",                                                                                //
                order: 5000                                                                                            //
            },                                                                                                         //
            {                                                                                                          //
                _id: "6000",                                                                                           //
                is_active: true,                                                                                       //
                name: "MENUS.WAITER_CALL",                                                                             //
                url: "/app/waiter-call",                                                                               //
                icon_name: "record_voice_over",                                                                        //
                order: 6000                                                                                            //
            },                                                                                                         //
            {                                                                                                          //
                _id: "7000",                                                                                           //
                is_active: true,                                                                                       //
                name: "MENUS.ADMINISTRATION.ORDERS_CHEF",                                                              //
                url: "/app/chef-orders",                                                                               //
                icon_name: "dns",                                                                                      //
                order: 7000                                                                                            //
            }                                                                                                          //
        ];                                                                                                             //
        menus.forEach(function (menu) { return menu_collection_1.Menus.insert(menu); });                               //
    }                                                                                                                  //
}                                                                                                                      // 212
exports.loadMenus = loadMenus;                                                                                         // 4
//# sourceMappingURL=menus.js.map                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"roles.js":["../../../../both/collections/auth/role.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/fixtures/auth/roles.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var role_collection_1 = require("../../../../both/collections/auth/role.collection");                                  // 1
function loadRoles() {                                                                                                 // 4
    if (role_collection_1.Roles.find().cursor.count() === 0) {                                                         //
        var roles = [{                                                                                                 //
                _id: "100",                                                                                            //
                is_active: true,                                                                                       //
                name: "ROLE.ADMINISTRATOR",                                                                            //
                description: "restaurant administrator",                                                               //
                menus: ["900", "1000", "2000", "3000"]                                                                 //
            }, {                                                                                                       //
                _id: "200",                                                                                            //
                is_active: true,                                                                                       //
                name: "ROLE.WAITER",                                                                                   //
                description: "restaurant waiter",                                                                      //
                menus: []                                                                                              //
            }, {                                                                                                       //
                _id: "300",                                                                                            //
                is_active: false,                                                                                      //
                name: "ROLE.CASHIER",                                                                                  //
                description: "restaurant cashier",                                                                     //
                menus: []                                                                                              //
            }, {                                                                                                       //
                _id: "400",                                                                                            //
                is_active: true,                                                                                       //
                name: "ROLE.CUSTOMER",                                                                                 //
                description: "restaurant customer",                                                                    //
                menus: ["4000", "5000", "6000"]                                                                        //
            }, {                                                                                                       //
                _id: "500",                                                                                            //
                is_active: true,                                                                                       //
                name: "ROLE.CHEF",                                                                                     //
                description: "restaurant chef",                                                                        //
                menus: ["7000"]                                                                                        //
            }, {                                                                                                       //
                _id: "600",                                                                                            //
                is_active: true,                                                                                       //
                name: "ROLE.SUPERVISOR",                                                                               //
                description: "restaurant supervisor",                                                                  //
                menus: ["910", "1100", "3100"]                                                                         //
            }];                                                                                                        //
        roles.forEach(function (role) { return role_collection_1.Roles.insert(role); });                               //
    }                                                                                                                  //
}                                                                                                                      // 48
exports.loadRoles = loadRoles;                                                                                         // 4
//# sourceMappingURL=roles.js.map                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"general":{"currencies.js":["../../../../both/collections/general/currency.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/fixtures/general/currencies.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var currency_collection_1 = require("../../../../both/collections/general/currency.collection");                       // 2
function loadCurrencies() {                                                                                            // 4
    if (currency_collection_1.Currencies.find().cursor.count() === 0) {                                                //
        var currencies = [                                                                                             //
            { _id: '10', isActive: true, name: 'CURRENCIES.BALBOA', code: 'PAB', numericCode: '590', decimal: 0.01 },  //
            { _id: '20', isActive: true, name: 'CURRENCIES.BOLIVAR', code: 'VEF', numericCode: '937', decimal: 0.01 },
            { _id: '30', isActive: true, name: 'CURRENCIES.BOLIVIANO', code: 'BOB', numericCode: '068', decimal: 0.01 },
            { _id: '40', isActive: true, name: 'CURRENCIES.COSTA_RICA_COLON', code: 'CRC', numericCode: '188', decimal: 0.01 },
            { _id: '50', isActive: true, name: 'CURRENCIES.CORDOBA', code: 'NIO', numericCode: '558', decimal: 0.01 },
            { _id: '60', isActive: true, name: 'CURRENCIES.CZECH_REPUBLIC_KORUNA', code: 'CZK', numericCode: '203', decimal: 0.01 },
            { _id: '70', isActive: true, name: 'CURRENCIES.DENMARK_KRONE', code: 'DKK', numericCode: '208', decimal: 0.01 },
            { _id: '80', isActive: true, name: 'CURRENCIES.ICELAND_KRONA', code: 'ISK', numericCode: '352', decimal: 0 },
            { _id: '90', isActive: true, name: 'CURRENCIES.NORWAY_KRONE', code: 'NOK', numericCode: '578', decimal: 0.01 },
            { _id: '100', isActive: true, name: 'CURRENCIES.SWEDEN_KRONA', code: 'SEK', numericCode: '752', decimal: 0.01 },
            { _id: '110', isActive: true, name: 'CURRENCIES.DENAR', code: 'MKD', numericCode: '807', decimal: 0.01 },  //
            { _id: '120', isActive: true, name: 'CURRENCIES.SERBIA_DINAR', code: 'RSD', numericCode: '941', decimal: 0.01 },
            { _id: '130', isActive: true, name: 'CURRENCIES.BELIZE_DOLLAR', code: 'BZD', numericCode: '084', decimal: 0.01 },
            { _id: '140', isActive: true, name: 'CURRENCIES.BERMUDIAN_DOLLAR', code: 'BMD', numericCode: '060', decimal: 0.01 },
            { _id: '150', isActive: true, name: 'CURRENCIES.CANADIAN_DOLLAR', code: 'CAD', numericCode: '124', decimal: 0.01 },
            { _id: '160', isActive: true, name: 'CURRENCIES.UNITED_STATES_DOLLAR', code: 'USD', numericCode: '840', decimal: 0.01 },
            { _id: '170', isActive: true, name: 'CURRENCIES.GUYANA_DOLLAR', code: 'GYD', numericCode: '328', decimal: 0.01 },
            { _id: '180', isActive: true, name: 'CURRENCIES.SURINAME_DOLLAR', code: 'SRD', numericCode: '968', decimal: 0.01 },
            { _id: '190', isActive: true, name: 'CURRENCIES.ARMENIAM_DRAM', code: 'AMD', numericCode: '051', decimal: 0.01 },
            { _id: '200', isActive: true, name: 'CURRENCIES.EURO', code: 'EUR', numericCode: '978', decimal: 0.01 },   //
            { _id: '210', isActive: true, name: 'CURRENCIES.HUNGARY_FORINT', code: 'HUF', numericCode: '348', decimal: 0.01 },
            { _id: '220', isActive: true, name: 'CURRENCIES.FRANC', code: 'CHF', numericCode: '756', decimal: 0.01 },  //
            { _id: '230', isActive: true, name: 'CURRENCIES.UKRAINE_HRYVNIA', code: 'UAH', numericCode: '980', decimal: 0.01 },
            { _id: '240', isActive: true, name: 'CURRENCIES.GUARANI', code: 'PYG', numericCode: '600', decimal: 0 },   //
            { _id: '250', isActive: true, name: 'CURRENCIES.KUNA', code: 'HRK', numericCode: '191', decimal: 0.01 },   //
            { _id: '260', isActive: true, name: 'CURRENCIES.LARI', code: 'GEL', numericCode: '981', decimal: 0.01 },   //
            { _id: '270', isActive: true, name: 'CURRENCIES.LEK', code: 'ALL', numericCode: '008', decimal: 0.01 },    //
            { _id: '280', isActive: true, name: 'CURRENCIES.LEMPIRA', code: 'HNL', numericCode: '340', decimal: 0.01 },
            { _id: '290', isActive: true, name: 'CURRENCIES.MOLDOVA_LEU', code: 'MDL', numericCode: '498', decimal: 0.01 },
            { _id: '300', isActive: true, name: 'CURRENCIES.ROMANIAN_LEU', code: 'RON', numericCode: '946', decimal: 0.01 },
            { _id: '310', isActive: true, name: 'CURRENCIES.BULGARIA_LEV', code: 'BGN', numericCode: '975', decimal: 0.01 },
            { _id: '320', isActive: true, name: 'CURRENCIES.POUND_STERLING', code: 'GBP', numericCode: '826', decimal: 0.01 },
            { _id: '330', isActive: true, name: 'CURRENCIES.FALKLAND_ISLANDS_POUND', code: 'FKP', numericCode: '238', decimal: 0.01 },
            { _id: '340', isActive: true, name: 'CURRENCIES.TURKISH_LIRA', code: 'TRY', numericCode: '949', decimal: 0.01 },
            { _id: '350', isActive: true, name: 'CURRENCIES.AZERBAIJANI_MANAT', code: 'AZN', numericCode: '944', decimal: 0.01 },
            { _id: '360', isActive: true, name: 'CURRENCIES.CONVERTIBLE_MARK', code: 'BAM', numericCode: '977', decimal: 0.01 },
            { _id: '370', isActive: true, name: 'CURRENCIES.ARGENTINA_PESO', code: 'ARS', numericCode: '032', decimal: 0.01 },
            { _id: '380', isActive: true, name: 'CURRENCIES.CHILE_PESO', code: 'CLP', numericCode: '152', decimal: 0 },
            { _id: '390', isActive: true, name: 'CURRENCIES.COLOMBIA_PESO', code: 'COP', numericCode: '170', decimal: 0.01 },
            { _id: '400', isActive: true, name: 'CURRENCIES.MEXICO_PESO', code: 'MXN', numericCode: '484', decimal: 0.01 },
            { _id: '410', isActive: true, name: 'CURRENCIES.URUGUAY_PESO', code: 'UYU', numericCode: '858', decimal: 0.01 },
            { _id: '420', isActive: true, name: 'CURRENCIES.QUETZAL', code: 'GTQ', numericCode: '320', decimal: 0.01 },
            { _id: '430', isActive: true, name: 'CURRENCIES.BRAZILIAN_REAL', code: 'BRL', numericCode: '986', decimal: 0.01 },
            { _id: '440', isActive: true, name: 'CURRENCIES.BELARUSIAN_RUBLE', code: 'BYR', numericCode: '974', decimal: 0 },
            { _id: '450', isActive: true, name: 'CURRENCIES.RUSSIAN_RUBLE', code: 'RUB', numericCode: '643', decimal: 0.01 },
            { _id: '460', isActive: true, name: 'CURRENCIES.SOL', code: 'PEN', numericCode: '604', decimal: 0.01 },    //
            { _id: '470', isActive: true, name: 'CURRENCIES.TENGE', code: 'KZT', numericCode: '398', decimal: 0.01 },  //
            { _id: '480', isActive: true, name: 'CURRENCIES.ZLOTY', code: 'PLN', numericCode: '985', decimal: 0.01 }   //
        ];                                                                                                             //
        currencies.forEach(function (cur) { return currency_collection_1.Currencies.insert(cur); });                   //
    }                                                                                                                  //
}                                                                                                                      // 58
exports.loadCurrencies = loadCurrencies;                                                                               // 4
//# sourceMappingURL=currencies.js.map                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"email-contents.js":["../../../../both/collections/general/email-content.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/fixtures/general/email-contents.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var email_content_collection_1 = require("../../../../both/collections/general/email-content.collection");             // 2
function loadEmailContents() {                                                                                         // 4
    if (email_content_collection_1.EmailContents.find().cursor.count() === 0) {                                        //
        var emailContents = [                                                                                          //
            {                                                                                                          //
                _id: '100',                                                                                            //
                language: 'en',                                                                                        //
                lang_dictionary: [                                                                                     //
                    { label: 'chargeSoonEmailSubjectVar', traduction: 'Your monthly Iurest service will ends soon' },  //
                    { label: 'greetVar', traduction: 'Hello' },                                                        //
                    { label: 'welcomeMsgVar', traduction: 'We got a request to reset you password, if it was you click the button above.' },
                    { label: 'btnTextVar', traduction: 'Reset' },                                                      //
                    { label: 'beforeMsgVar', traduction: 'If you do not want to change the password, ignore this message.' },
                    { label: 'regardVar', traduction: 'Thanks, Iurest team.' },                                        //
                    { label: 'followMsgVar', traduction: 'Follow us on social networks' },                             //
                    { label: 'reminderChargeSoonMsgVar', traduction: 'Remember that your monthly Iurest service for: ' },
                    { label: 'reminderChargeSoonMsgVar2', traduction: 'Ends on: ' },                                   //
                    { label: 'instructionchargeSoonMsgVar', traduction: 'If you want to continue using all the system features, entering with your email or username and select the menu Restaurants > Administration > Edit restaurant > # Tables' },
                    { label: 'reminderExpireSoonMsgVar', traduction: 'Remember that your monthly Iurest service for: ' },
                    { label: 'reminderExpireSoonMsgVar2', traduction: 'Expires on: ' },                                //
                    { label: 'reminderExpireSoonMsgVar3', traduction: 'If you want to continue using all the system features, entering with your email or username and select the menu Payments > Monthly payment' },
                    { label: 'expireSoonEmailSubjectVar', traduction: 'Your Iurest service will expire soon' },        //
                    { label: 'reminderRestExpiredVar', traduction: 'Your monthly Iurest service for: ' },              //
                    { label: 'reminderRestExpiredVar2', traduction: 'Has expired' },                                   //
                    { label: 'reminderRestExpiredVar3', traduction: 'If you want to continue using all the system features, entering with your email or username and select the menu Payments > Reactivate ' },
                    { label: 'restExpiredEmailSubjectVar', traduction: 'Your Iurest service has expired' }             //
                ]                                                                                                      //
            },                                                                                                         //
            {                                                                                                          //
                _id: '200',                                                                                            //
                language: 'es',                                                                                        //
                lang_dictionary: [                                                                                     //
                    { label: 'chargeSoonEmailSubjectVar', traduction: 'Tu servicio mensual de Iurest terminará pronto' },
                    { label: 'greetVar', traduction: 'Hola' },                                                         //
                    { label: 'welcomeMsgVar', traduction: 'Hemos recibido una petición para cambiar tu contraseña, si fuiste tu haz click en el botón abajo' },
                    { label: 'btnTextVar', traduction: 'Cambiar' },                                                    //
                    { label: 'beforeMsgVar', traduction: 'Si no quieres cambiar la contraseña, ignora este mensaje.' },
                    { label: 'regardVar', traduction: 'Gracias, equipo Iurest' },                                      //
                    { label: 'followMsgVar', traduction: 'Siguenos en redes sociales' },                               //
                    { label: 'reminderChargeSoonMsgVar', traduction: 'Recuerda que tu servicio mensual de Iurest para: ' },
                    { label: 'reminderChargeSoonMsgVar2', traduction: 'Finaliza el: ' },                               //
                    { label: 'instructionchargeSoonMsgVar', traduction: 'Si deseas seguir usando todas las funcionalidades del sistema, ingresa con tu usuario o correo y selecciona el menú Restaurante > Administración > Editar restaurante > # Mesas' },
                    { label: 'reminderExpireSoonMsgVar', traduction: 'Recuerda que tu servicio mensual de Iurest para: ' },
                    { label: 'reminderExpireSoonMsgVar2', traduction: 'Expira el: ' },                                 //
                    { label: 'reminderExpireSoonMsgVar3', traduction: 'Si deseas seguir usando todas las funcionalidades del sistema, ingresa con tu usuario o correo y selecciona el menú Pagos > Pago mensual' },
                    { label: 'expireSoonEmailSubjectVar', traduction: 'Tu servicio Iurest expirará pronto' },          //
                    { label: 'reminderRestExpiredVar', traduction: 'Tu servicio mensual de Iurest para: ' },           //
                    { label: 'reminderRestExpiredVar2', traduction: 'ha expirado' },                                   //
                    { label: 'reminderRestExpiredVar3', traduction: 'Si deseas seguir usando todas las funcionalidades del sistema, ingresa con tu usuario o correo y selecciona la opción Pagos > Reactivar ' },
                    { label: 'restExpiredEmailSubjectVar', traduction: 'Tu servicio de Iurest ha expirado' }           //
                ]                                                                                                      //
            }                                                                                                          //
        ];                                                                                                             //
        emailContents.forEach(function (emailContent) { return email_content_collection_1.EmailContents.insert(emailContent); });
    }                                                                                                                  //
}                                                                                                                      // 58
exports.loadEmailContents = loadEmailContents;                                                                         // 4
//# sourceMappingURL=email-contents.js.map                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"hours.js":["../../../../both/collections/general/hours.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/fixtures/general/hours.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var hours_collection_1 = require("../../../../both/collections/general/hours.collection");                             // 2
function loadHours() {                                                                                                 // 4
    if (hours_collection_1.Hours.find().cursor.count() === 0) {                                                        //
        var hours = [                                                                                                  //
            { hour: '00:00' },                                                                                         //
            { hour: '00:30' },                                                                                         //
            { hour: '01:00' },                                                                                         //
            { hour: '01:30' },                                                                                         //
            { hour: '02:00' },                                                                                         //
            { hour: '02:30' },                                                                                         //
            { hour: '03:00' },                                                                                         //
            { hour: '03:30' },                                                                                         //
            { hour: '04:00' },                                                                                         //
            { hour: '04:30' },                                                                                         //
            { hour: '05:00' },                                                                                         //
            { hour: '05:30' },                                                                                         //
            { hour: '06:00' },                                                                                         //
            { hour: '06:30' },                                                                                         //
            { hour: '07:00' },                                                                                         //
            { hour: '07:30' },                                                                                         //
            { hour: '08:00' },                                                                                         //
            { hour: '08:30' },                                                                                         //
            { hour: '09:00' },                                                                                         //
            { hour: '09:30' },                                                                                         //
            { hour: '10:00' },                                                                                         //
            { hour: '10:30' },                                                                                         //
            { hour: '11:00' },                                                                                         //
            { hour: '11:30' },                                                                                         //
            { hour: '12:00' },                                                                                         //
            { hour: '12:30' },                                                                                         //
            { hour: '13:00' },                                                                                         //
            { hour: '13:30' },                                                                                         //
            { hour: '14:00' },                                                                                         //
            { hour: '14:30' },                                                                                         //
            { hour: '15:00' },                                                                                         //
            { hour: '15:30' },                                                                                         //
            { hour: '16:00' },                                                                                         //
            { hour: '16:30' },                                                                                         //
            { hour: '17:00' },                                                                                         //
            { hour: '17:30' },                                                                                         //
            { hour: '18:00' },                                                                                         //
            { hour: '18:30' },                                                                                         //
            { hour: '19:00' },                                                                                         //
            { hour: '19:30' },                                                                                         //
            { hour: '20:00' },                                                                                         //
            { hour: '20:30' },                                                                                         //
            { hour: '21:00' },                                                                                         //
            { hour: '21:30' },                                                                                         //
            { hour: '22:00' },                                                                                         //
            { hour: '22:30' },                                                                                         //
            { hour: '23:00' },                                                                                         //
            { hour: '23:30' }                                                                                          //
        ];                                                                                                             //
        hours.forEach(function (hour) { return hours_collection_1.Hours.insert(hour); });                              //
    }                                                                                                                  //
}                                                                                                                      // 60
exports.loadHours = loadHours;                                                                                         // 4
//# sourceMappingURL=hours.js.map                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"parameters.js":["../../../../both/collections/general/parameter.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/fixtures/general/parameters.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var parameter_collection_1 = require("../../../../both/collections/general/parameter.collection");                     // 2
function loadParameters() {                                                                                            // 4
    if (parameter_collection_1.Parameters.find().cursor.count() === 0) {                                               //
        var parameters = [                                                                                             //
            { _id: '100', name: 'start_payment_day', value: '1', description: 'initial day of month to validate client payment' },
            { _id: '200', name: 'end_payment_day', value: '5', description: 'final day of month to validate client payment' },
            { _id: '300', name: 'from_email', value: 'Iurest <no-reply@iurest.com>', description: 'default from account email to send messages' },
            { _id: '400', name: 'first_pay_discount', value: '50', description: 'discount in percent to service first pay' },
            { _id: '500', name: 'colombia_tax_iva', value: '19', description: 'Colombia tax iva to monthly iurest payment' }
        ];                                                                                                             //
        parameters.forEach(function (parameter) { return parameter_collection_1.Parameters.insert(parameter); });      //
    }                                                                                                                  //
}                                                                                                                      // 16
exports.loadParameters = loadParameters;                                                                               // 4
//# sourceMappingURL=parameters.js.map                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"paymentMethods.js":["../../../../both/collections/general/paymentMethod.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/fixtures/general/paymentMethods.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var paymentMethod_collection_1 = require("../../../../both/collections/general/paymentMethod.collection");             // 2
function loadPaymentMethods() {                                                                                        // 4
    if (paymentMethod_collection_1.PaymentMethods.find().cursor.count() === 0) {                                       //
        var payments = [                                                                                               //
            { _id: "10", isActive: true, name: 'PAYMENT_METHODS.CASH' },                                               //
            { _id: "20", isActive: true, name: 'PAYMENT_METHODS.CREDIT_CARD' },                                        //
            { _id: "30", isActive: true, name: 'PAYMENT_METHODS.DEBIT_CARD' },                                         //
            { _id: "40", isActive: false, name: 'PAYMENT_METHODS.ONLINE' },                                            //
        ];                                                                                                             //
        payments.forEach(function (pay) { return paymentMethod_collection_1.PaymentMethods.insert(pay); });            //
    }                                                                                                                  //
}                                                                                                                      // 14
exports.loadPaymentMethods = loadPaymentMethods;                                                                       // 4
//# sourceMappingURL=paymentMethods.js.map                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"payments":{"cc-payment-methods.js":["../../../../both/collections/payment/cc-payment-methods.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/fixtures/payments/cc-payment-methods.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var cc_payment_methods_collection_1 = require("../../../../both/collections/payment/cc-payment-methods.collection");   // 2
function loadCcPaymentMethods() {                                                                                      // 4
    if (cc_payment_methods_collection_1.CcPaymentMethods.find().cursor.count() == 0) {                                 //
        var ccPaymentMethods = [                                                                                       //
            { _id: '10', is_active: true, name: 'Visa', payu_code: 'VISA', logo_name: 'visa' },                        //
            { _id: '20', is_active: true, name: 'Mastercard', payu_code: 'MASTERCARD', logo_name: 'mastercard' },      //
            { _id: '30', is_active: true, name: 'American Express', payu_code: 'AMEX', logo_name: 'amex' },            //
            { _id: '40', is_active: true, name: 'Diners Club', payu_code: 'DINERS', logo_name: 'diners' }              //
        ];                                                                                                             //
        ccPaymentMethods.forEach(function (ccPaymentMethod) { cc_payment_methods_collection_1.CcPaymentMethods.insert(ccPaymentMethod); });
    }                                                                                                                  //
}                                                                                                                      // 14
exports.loadCcPaymentMethods = loadCcPaymentMethods;                                                                   // 4
//# sourceMappingURL=cc-payment-methods.js.map                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"settings":{"cities.js":["../../../../both/collections/settings/city.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/fixtures/settings/cities.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var city_collection_1 = require("../../../../both/collections/settings/city.collection");                              // 1
function loadCities() {                                                                                                // 4
    if (city_collection_1.Cities.find().cursor.count() === 0) {                                                        //
        var cities = [                                                                                                 //
            { _id: '1901', is_active: true, name: 'Aguadas', country: '1900' },                                        //
            { _id: '1902', is_active: true, name: 'Amazonas', country: '1900' },                                       //
            { _id: '1903', is_active: true, name: 'Arauca', country: '1900' },                                         //
            { _id: '1904', is_active: true, name: 'Armenia', country: '1900' },                                        //
            { _id: '1905', is_active: true, name: 'Barichara', country: '1900' },                                      //
            { _id: '1906', is_active: true, name: 'Barranquilla', country: '1900' },                                   //
            { _id: '1907', is_active: true, name: 'Bogotá D.C', country: '1900' },                                     //
            { _id: '1908', is_active: true, name: 'Bucaramanga', country: '1900' },                                    //
            { _id: '1909', is_active: true, name: 'Buenaventura', country: '1900' },                                   //
            { _id: '1910', is_active: true, name: 'Buga', country: '1900' },                                           //
            { _id: '1911', is_active: true, name: 'Cali', country: '1900' },                                           //
            { _id: '1912', is_active: true, name: 'Cartagena de Indias', country: '1900' },                            //
            { _id: '1913', is_active: true, name: 'Cartago', country: '1900' },                                        //
            { _id: '1914', is_active: true, name: 'Chiquinquirá', country: '1900' },                                   //
            { _id: '1915', is_active: true, name: 'Chocó', country: '1900' },                                          //
            { _id: '1916', is_active: true, name: 'Ciénaga', country: '1900' },                                        //
            { _id: '1917', is_active: true, name: 'Cúcuta', country: '1900' },                                         //
            { _id: '1918', is_active: true, name: 'El Cocuy', country: '1900' },                                       //
            { _id: '1919', is_active: true, name: 'El Espinal', country: '1900' },                                     //
            { _id: '1920', is_active: true, name: 'El Hobo', country: '1900' },                                        //
            { _id: '1921', is_active: true, name: 'El Jardín', country: '1900' },                                      //
            { _id: '1922', is_active: true, name: 'Florencia', country: '1900' },                                      //
            { _id: '1923', is_active: true, name: 'Girardot', country: '1900' },                                       //
            { _id: '1924', is_active: true, name: 'Girón', country: '1900' },                                          //
            { _id: '1925', is_active: true, name: 'Guaduas', country: '1900' },                                        //
            { _id: '1926', is_active: true, name: 'Guainía', country: '1900' },                                        //
            { _id: '1927', is_active: true, name: 'Guapi', country: '1900' },                                          //
            { _id: '1928', is_active: true, name: 'Honda', country: '1900' },                                          //
            { _id: '1929', is_active: true, name: 'Ibagué', country: '1900' },                                         //
            { _id: '1930', is_active: true, name: 'Inzá', country: '1900' },                                           //
            { _id: '1931', is_active: true, name: 'Jericó', country: '1900' },                                         //
            { _id: '1932', is_active: true, name: 'La Calera', country: '1900' },                                      //
            { _id: '1933', is_active: true, name: 'La Macarena', country: '1900' },                                    //
            { _id: '1934', is_active: true, name: 'La Playa de Belén', country: '1900' },                              //
            { _id: '1935', is_active: true, name: 'Lorica', country: '1900' },                                         //
            { _id: '1936', is_active: true, name: 'Manizales', country: '1900' },                                      //
            { _id: '1937', is_active: true, name: 'Medellín', country: '1900' },                                       //
            { _id: '1938', is_active: true, name: 'Melgar', country: '1900' },                                         //
            { _id: '1939', is_active: true, name: 'Mitú', country: '1900' },                                           //
            { _id: '1940', is_active: true, name: 'Mocoa', country: '1900' },                                          //
            { _id: '1941', is_active: true, name: 'Mompox', country: '1900' },                                         //
            { _id: '1942', is_active: true, name: 'Monguí', country: '1900' },                                         //
            { _id: '1943', is_active: true, name: 'Montería', country: '1900' },                                       //
            { _id: '1944', is_active: true, name: 'Neiva', country: '1900' },                                          //
            { _id: '1945', is_active: true, name: 'Paipa', country: '1900' },                                          //
            { _id: '1946', is_active: true, name: 'Pamplona', country: '1900' },                                       //
            { _id: '1947', is_active: true, name: 'Pasto', country: '1900' },                                          //
            { _id: '1948', is_active: true, name: 'Pereira', country: '1900' },                                        //
            { _id: '1949', is_active: true, name: 'Pitalito', country: '1900' },                                       //
            { _id: '1950', is_active: true, name: 'Popayán', country: '1900' },                                        //
            { _id: '1951', is_active: true, name: 'Prado', country: '1900' },                                          //
            { _id: '1952', is_active: true, name: 'Puerto Carreño', country: '1900' },                                 //
            { _id: '1953', is_active: true, name: 'Riohacha', country: '1900' },                                       //
            { _id: '1954', is_active: true, name: 'Salamina', country: '1900' },                                       //
            { _id: '1955', is_active: true, name: 'San Agustín', country: '1900' },                                    //
            { _id: '1956', is_active: true, name: 'San Andrés', country: '1900' },                                     //
            { _id: '1957', is_active: true, name: 'San Gil', country: '1900' },                                        //
            { _id: '1958', is_active: true, name: 'San José del Guaviare', country: '1900' },                          //
            { _id: '1959', is_active: true, name: 'Santa Fe de Antioquia', country: '1900' },                          //
            { _id: '1960', is_active: true, name: 'Santa Marta', country: '1900' },                                    //
            { _id: '1961', is_active: true, name: 'Santa Rosa de Cabal', country: '1900' },                            //
            { _id: '1962', is_active: true, name: 'Sibundoy', country: '1900' },                                       //
            { _id: '1963', is_active: true, name: 'Sincelejo', country: '1900' },                                      //
            { _id: '1964', is_active: true, name: 'Socorro', country: '1900' },                                        //
            { _id: '1965', is_active: true, name: 'Sogamoso', country: '1900' },                                       //
            { _id: '1966', is_active: true, name: 'Tunja', country: '1900' },                                          //
            { _id: '1967', is_active: true, name: 'Valledupar', country: '1900' },                                     //
            { _id: '1968', is_active: true, name: 'Villa de Leyva', country: '1900' },                                 //
            { _id: '1969', is_active: true, name: 'Villavicencio', country: '1900' },                                  //
            { _id: '1970', is_active: true, name: 'Villeta', country: '1900' },                                        //
            { _id: '1971', is_active: true, name: 'Yopal', country: '1900' },                                          //
            { _id: '1972', is_active: true, name: 'Zipaquirá', country: '1900' },                                      //
            { _id: "1701", is_active: true, name: 'Viña del Mar', country: '1700' },                                   //
            { _id: "1702", is_active: true, name: 'Valparaíso', country: '1700' },                                     //
            { _id: "1703", is_active: true, name: 'La Serena', country: '1700' },                                      //
            { _id: "1704", is_active: true, name: 'Concepción', country: '1700' },                                     //
            { _id: "1705", is_active: true, name: 'Santiago', country: '1700' },                                       //
        ];                                                                                                             //
        cities.forEach(function (city) { return city_collection_1.Cities.insert(city); });                             //
    }                                                                                                                  //
}                                                                                                                      // 88
exports.loadCities = loadCities;                                                                                       // 4
//# sourceMappingURL=cities.js.map                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"countries.js":["../../../../both/collections/settings/country.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/fixtures/settings/countries.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var country_collection_1 = require("../../../../both/collections/settings/country.collection");                        // 1
function loadCountries() {                                                                                             // 4
    if (country_collection_1.Countries.find().cursor.count() === 0) {                                                  //
        var countries = [                                                                                              //
            { _id: '100', is_active: false, name: 'COUNTRIES.ALBANIA', alfaCode2: 'AL', alfaCode3: 'ALB', numericCode: '008', indicative: '(+ 355)', currencyId: '270', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '200', is_active: false, name: 'COUNTRIES.GERMANY', alfaCode2: 'DE', alfaCode3: 'DEU', numericCode: '276', indicative: '(+ 49)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '300', is_active: false, name: 'COUNTRIES.ANDORRA', alfaCode2: 'AD', alfaCode3: 'AND', numericCode: '020', indicative: '(+ 376)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '400', is_active: false, name: 'COUNTRIES.ARGENTINA', alfaCode2: 'AR', alfaCode3: 'ARG', numericCode: '032', indicative: '(+ 54)', currencyId: '370', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '500', is_active: false, name: 'COUNTRIES.ARMENIA', alfaCode2: 'AM', alfaCode3: 'ARM', numericCode: '051', indicative: '(+ 374)', currencyId: '190', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '600', is_active: false, name: 'COUNTRIES.AUSTRIA', alfaCode2: 'AT', alfaCode3: 'AUT', numericCode: '040', indicative: '(+ 43)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '700', is_active: false, name: 'COUNTRIES.AZERBAIJAN', alfaCode2: 'AZ', alfaCode3: 'AZE', numericCode: '031', indicative: '(+ 994)', currencyId: '350', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '800', is_active: false, name: 'COUNTRIES.BELGIUM', alfaCode2: 'BE', alfaCode3: 'BEL', numericCode: '056', indicative: '(+ 32)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '900', is_active: false, name: 'COUNTRIES.BELIZE', alfaCode2: 'BZ', alfaCode3: 'BLZ', numericCode: '084', indicative: '(+ 501)', currencyId: '130', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '1000', is_active: false, name: 'COUNTRIES.BERMUDAS', alfaCode2: 'BM', alfaCode3: 'BMU', numericCode: '060', indicative: '(+ 1004)', currencyId: '140', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '1100', is_active: false, name: 'COUNTRIES.BELARUS', alfaCode2: 'BY', alfaCode3: 'BLR', numericCode: '112', indicative: '(+ 375)', currencyId: '440', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '1200', is_active: false, name: 'COUNTRIES.BOLIVIA', alfaCode2: 'BO', alfaCode3: 'BOL', numericCode: '068', indicative: '(+ 591)', currencyId: '30', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '1300', is_active: false, name: 'COUNTRIES.BOSNIA_HERZEGOVINA', alfaCode2: 'BA', alfaCode3: 'BIH', numericCode: '070', indicative: '(+ 387)', currencyId: '360', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '1400', is_active: false, name: 'COUNTRIES.BRAZIL', alfaCode2: 'BR', alfaCode3: 'BRA', numericCode: '076', indicative: '(+ 55)', currencyId: '430', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '1500', is_active: false, name: 'COUNTRIES.BULGARIA', alfaCode2: 'BG', alfaCode3: 'BGR', numericCode: '100', indicative: '(+ 359)', currencyId: '310', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '1600', is_active: false, name: 'COUNTRIES.CANADA', alfaCode2: 'CA', alfaCode3: 'CAN', numericCode: '124', indicative: '(+ 001)', currencyId: '150', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '1700', is_active: false, name: 'COUNTRIES.CHILE', alfaCode2: 'CL', alfaCode3: 'CHL', numericCode: '152', indicative: '(+ 56)', currencyId: '380', itemsWithDifferentTax: true, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '1800', is_active: false, name: 'COUNTRIES.CYPRUS', alfaCode2: 'CY', alfaCode3: 'CYP', numericCode: '196', indicative: '(+357)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '1900', is_active: true, name: 'COUNTRIES.COLOMBIA', alfaCode2: 'CO', alfaCode3: 'COL', numericCode: '170', indicative: '(+ 57)', currencyId: '390', itemsWithDifferentTax: false, queue: ["0", "1"], financialInformation: [{ controlType: 'text', key: 'INC', label: 'FINANCIAL_INFO.COLOMBIA.INC', order: 1 }, { controlType: 'text', key: 'BUSINESS_NAME_TEXT', label: 'FINANCIAL_INFO.COLOMBIA.BUSINESS_NAME', order: 2 }, { controlType: 'textbox', key: 'BUSINESS_NAME', label: 'FINANCIAL_INFO.COLOMBIA.BUSINESS_NAME_LABEL', required: true, order: 3 }, { controlType: 'text', key: 'NIT_TEXT', label: 'FINANCIAL_INFO.COLOMBIA.NIT', order: 4 }, { controlType: 'textbox', key: 'NIT', label: 'FINANCIAL_INFO.COLOMBIA.NIT_LABEL', required: true, order: 5 }, { controlType: 'text', key: 'DIAN_NUMERATION_TEXT', label: 'FINANCIAL_INFO.COLOMBIA.DIAN_NUMERATION', order: 6 }, { controlType: 'textbox', key: 'DIAN_NUMERATION_FROM', label: 'FINANCIAL_INFO.COLOMBIA.DIAN_NUMERATION_FROM', required: true, order: 7 }, { controlType: 'textbox', key: 'DIAN_NUMERATION_TO', label: 'FINANCIAL_INFO.COLOMBIA.DIAN_NUMERATION_TO', required: true, order: 8 }, { controlType: 'text', key: 'TIP_PERCENTAGE_TEXT', label: 'FINANCIAL_INFO.COLOMBIA.ENTER_TIP_PERCENTAGE', order: 9 }, { controlType: 'slider', key: 'TIP_PERCENTAGE', label: 'TIP_PERCENTAGE', value: 0, minValue: 0, maxValue: 100, stepValue: 0.01, required: true, order: 10 }], restaurantPrice: 22000, tablePrice: 200, cronValidateActive: '1 0 10 * *', cronChangeFreeDays: '1 0 10 * * *', cronEmailChargeSoon: '30 17 28 * *', cronEmailExpireSoon: '30 17 28 * *', cronEmailRestExpired: '30 17 28 * *' },
            { _id: '2000', is_active: false, name: 'COUNTRIES.COSTA_RICA', alfaCode2: 'CR', alfaCode3: 'CRI', numericCode: '188', indicative: '(+ 506)', currencyId: '40', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '2100', is_active: false, name: 'COUNTRIES.CROATIA', alfaCode2: 'HR', alfaCode3: 'HRV', numericCode: '191', indicative: '(+ 385)', currencyId: '250', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '2200', is_active: false, name: 'COUNTRIES.DENMARK', alfaCode2: 'DK', alfaCode3: 'DNK', numericCode: '208', indicative: '(+ 45)', currencyId: '70', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '2300', is_active: false, name: 'COUNTRIES.ECUADOR', alfaCode2: 'EC', alfaCode3: 'ECU', numericCode: '218', indicative: '(+ 593)', currencyId: '160', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '2400', is_active: false, name: 'COUNTRIES.EL_SALVADOR', alfaCode2: 'SV', alfaCode3: 'SLV', numericCode: '222', indicative: '(+ 503)', currencyId: '160', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '2500', is_active: false, name: 'COUNTRIES.SLOVAKIA', alfaCode2: 'SK', alfaCode3: 'SVK', numericCode: '703', indicative: '(+ 421)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '2600', is_active: false, name: 'COUNTRIES.SLOVENIA', alfaCode2: 'SI', alfaCode3: 'SVN', numericCode: '705', indicative: '(+ 386)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '2700', is_active: false, name: 'COUNTRIES.SPAIN', alfaCode2: 'ES', alfaCode3: 'ESP', numericCode: '724', indicative: '(+ 34)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '2800', is_active: false, name: 'COUNTRIES.UNITED_STATES', alfaCode2: 'US', alfaCode3: 'USA', numericCode: '840', indicative: '(+ 1)', currencyId: '160', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '2900', is_active: false, name: 'COUNTRIES.ESTONIA', alfaCode2: 'EE', alfaCode3: 'EST', numericCode: '233', indicative: '(+ 372)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '3000', is_active: false, name: 'COUNTRIES.FINLAND', alfaCode2: 'FI', alfaCode3: 'FIN', numericCode: '246', indicative: '(+ 358)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '3100', is_active: false, name: 'COUNTRIES.FRANCE', alfaCode2: 'FR', alfaCode3: 'FRA', numericCode: '250', indicative: '(+ 33)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '3200', is_active: false, name: 'COUNTRIES.GEORGIA', alfaCode2: 'GE', alfaCode3: 'GEO', numericCode: '268', indicative: '(+ 995)', currencyId: '260', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '3300', is_active: false, name: 'COUNTRIES.GREECE', alfaCode2: 'GR', alfaCode3: 'GRC', numericCode: '300', indicative: '(+ 30)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '3400', is_active: false, name: 'COUNTRIES.GREENLAND', alfaCode2: 'GL', alfaCode3: 'GRL', numericCode: '304', indicative: '(+ 299)', currencyId: '70', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '3500', is_active: false, name: 'COUNTRIES.GUATEMALA', alfaCode2: 'GT', alfaCode3: 'GTM', numericCode: '320', indicative: '(+ 502)', currencyId: '420', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '3600', is_active: false, name: 'COUNTRIES.FRENCH_GUIANA', alfaCode2: 'GF', alfaCode3: 'GUF', numericCode: '254', indicative: '(+ 594)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '3700', is_active: false, name: 'COUNTRIES.GUYANA', alfaCode2: 'GY', alfaCode3: 'GUY', numericCode: '328', indicative: '(+ 592)', currencyId: '170', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '3800', is_active: false, name: 'COUNTRIES.HONDURAS', alfaCode2: 'HN', alfaCode3: 'HND', numericCode: '340', indicative: '(+ 504)', currencyId: '280', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '3900', is_active: false, name: 'COUNTRIES.HUNGARY', alfaCode2: 'HU', alfaCode3: 'HUN', numericCode: '348', indicative: '(+ 36)', currencyId: '210', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '4000', is_active: false, name: 'COUNTRIES.IRELAND', alfaCode2: 'IE', alfaCode3: 'IRL', numericCode: '372', indicative: '(+ 353)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '4100', is_active: false, name: 'COUNTRIES.ICELAND', alfaCode2: 'IS', alfaCode3: 'ISL', numericCode: '352', indicative: '(+ 354)', currencyId: '80', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '4200', is_active: false, name: 'COUNTRIES.FALKLAND_ISLANDS', alfaCode2: 'FK', alfaCode3: 'FLK', numericCode: '238', indicative: '(+ 500)', currencyId: '330', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '4300', is_active: false, name: 'COUNTRIES.ITALY', alfaCode2: 'IT', alfaCode3: 'ITA', numericCode: '380', indicative: '(+ 39)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '4400', is_active: false, name: 'COUNTRIES.KAZAKHSTAN', alfaCode2: 'KZ', alfaCode3: 'KAZ', numericCode: '398', indicative: '(+ 731)', currencyId: '470', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '4500', is_active: false, name: 'COUNTRIES.LATVIA', alfaCode2: 'LV', alfaCode3: 'LVA', numericCode: '428', indicative: '(+ 371)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '4600', is_active: false, name: 'COUNTRIES.LIECHTENSTEIN', alfaCode2: 'LI', alfaCode3: 'LIE', numericCode: '438', indicative: '(+ 417)', currencyId: '220', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '4700', is_active: false, name: 'COUNTRIES.LITHUANIA', alfaCode2: 'LT', alfaCode3: 'LTU', numericCode: '440', indicative: '(+ 370)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '4800', is_active: false, name: 'COUNTRIES.LUXEMBOURG', alfaCode2: 'LU', alfaCode3: 'LUX', numericCode: '442', indicative: '(+ 352)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '4900', is_active: false, name: 'COUNTRIES.MACEDONIA', alfaCode2: 'MK', alfaCode3: 'MKD', numericCode: '807', indicative: '(+ 389)', currencyId: '110', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '5000', is_active: false, name: 'COUNTRIES.MALTA', alfaCode2: 'MT', alfaCode3: 'MLT', numericCode: '470', indicative: '(+ 356)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '5100', is_active: false, name: 'COUNTRIES.MEXICO', alfaCode2: 'MX', alfaCode3: 'MEX', numericCode: '484', indicative: '(+ 52)', currencyId: '400', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '5200', is_active: false, name: 'COUNTRIES.MOLDAVIA', alfaCode2: 'MD', alfaCode3: 'MDA', numericCode: '498', indicative: '(+ 373)', currencyId: '290', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '5300', is_active: false, name: 'COUNTRIES.MONACO', alfaCode2: 'MC', alfaCode3: 'MCO', numericCode: '492', indicative: '(+ 377)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '5400', is_active: false, name: 'COUNTRIES.MONTENEGRO', alfaCode2: 'ME', alfaCode3: 'MNE', numericCode: '499', indicative: '(+ 382)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '5500', is_active: false, name: 'COUNTRIES.NICARAGUA', alfaCode2: 'NI', alfaCode3: 'NIC', numericCode: '558', indicative: '(+ 505)', currencyId: '50', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '5600', is_active: false, name: 'COUNTRIES.NORWAY', alfaCode2: 'NO', alfaCode3: 'NOR', numericCode: '578', indicative: '(+ 47)', currencyId: '90', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '5700', is_active: false, name: 'COUNTRIES.NETHERLANDS', alfaCode2: 'NL', alfaCode3: 'NLD', numericCode: '528', indicative: '(+ 31)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '5800', is_active: false, name: 'COUNTRIES.PANAMA', alfaCode2: 'PA', alfaCode3: 'PAN', numericCode: '591', indicative: '(+ 507)', currencyId: '10', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '5900', is_active: false, name: 'COUNTRIES.PARAGUAY', alfaCode2: 'PY', alfaCode3: 'PRY', numericCode: '600', indicative: '(+ 595)', currencyId: '240', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '6000', is_active: false, name: 'COUNTRIES.PERU', alfaCode2: 'PE', alfaCode3: 'PER', numericCode: '604', indicative: '(+ 51)', currencyId: '460', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '6100', is_active: false, name: 'COUNTRIES.POLAND', alfaCode2: 'PL', alfaCode3: 'POL', numericCode: '616', indicative: '(+ 48)', currencyId: '480', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '6200', is_active: false, name: 'COUNTRIES.PORTUGAL', alfaCode2: 'PT', alfaCode3: 'PRT', numericCode: '620', indicative: '(+ 351)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '6300', is_active: false, name: 'COUNTRIES.UNITED_KINGDOM', alfaCode2: 'GB', alfaCode3: 'GBR', numericCode: '826', indicative: '(+ 44)', currencyId: '320', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '6400', is_active: false, name: 'COUNTRIES.CZECH_REPUBLIC', alfaCode2: 'CZ', alfaCode3: 'CZE', numericCode: '203', indicative: '(+ 42)', currencyId: '60', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '6500', is_active: false, name: 'COUNTRIES.ROMANIA', alfaCode2: 'RO', alfaCode3: 'ROU', numericCode: '642', indicative: '(+ 40)', currencyId: '300', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '6600', is_active: false, name: 'COUNTRIES.RUSSIA', alfaCode2: 'RU', alfaCode3: 'RUS', numericCode: '643', indicative: '(+ 7)', currencyId: '450', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '6700', is_active: false, name: 'COUNTRIES.SAN_MARINO', alfaCode2: 'SM', alfaCode3: 'SMR', numericCode: '674', indicative: '(+ 378)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '6800', is_active: false, name: 'COUNTRIES.SAINT_PIERRE_MIQUELON', alfaCode2: 'PM', alfaCode3: 'SPM', numericCode: '666', indicative: '(+ 508)', currencyId: '200', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '6900', is_active: false, name: 'COUNTRIES.SERBIA', alfaCode2: 'RS', alfaCode3: 'SRB', numericCode: '688', indicative: '(+ 381)', currencyId: '120', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '7000', is_active: false, name: 'COUNTRIES.SWEDEN', alfaCode2: 'SE', alfaCode3: 'SWE', numericCode: '752', indicative: '(+ 46)', currencyId: '100', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '7100', is_active: false, name: 'COUNTRIES.SWITZERLAND', alfaCode2: 'CH', alfaCode3: 'CHE', numericCode: '756', indicative: '(+ 41)', currencyId: '220', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '7200', is_active: false, name: 'COUNTRIES.SURINAM', alfaCode2: 'SR', alfaCode3: 'SUR', numericCode: '740', indicative: '(+ 597)', currencyId: '180', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '7300', is_active: false, name: 'COUNTRIES.TURKEY', alfaCode2: 'TR', alfaCode3: 'TUR', numericCode: '792', indicative: '(+ 90)', currencyId: '340', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '7400', is_active: false, name: 'COUNTRIES.UKRAINE', alfaCode2: 'UA', alfaCode3: 'UKR', numericCode: '804', indicative: '(+ 380)', currencyId: '230', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '7500', is_active: false, name: 'COUNTRIES.URUGUAY', alfaCode2: 'UY', alfaCode3: 'URY', numericCode: '858', indicative: '(+ 598)', currencyId: '410', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' },
            { _id: '7600', is_active: false, name: 'COUNTRIES.VENEZUELA', alfaCode2: 'VE', alfaCode3: 'VEN', numericCode: '862', indicative: '(+ 58)', currencyId: '20', itemsWithDifferentTax: false, queue: [], financialInformation: [], restaurantPrice: 0, tablePrice: 0, cronValidateActive: '', cronChangeFreeDays: '', cronEmailChargeSoon: '', cronEmailExpireSoon: '', cronEmailRestExpired: '' }
        ];                                                                                                             //
        countries.forEach(function (country) { return country_collection_1.Countries.insert(country); });              //
    }                                                                                                                  //
}                                                                                                                      // 86
exports.loadCountries = loadCountries;                                                                                 // 4
//# sourceMappingURL=countries.js.map                                                                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"languages.js":["../../../../both/collections/settings/language.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/fixtures/settings/languages.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var language_collection_1 = require("../../../../both/collections/settings/language.collection");                      // 1
function loadLanguages() {                                                                                             // 4
    if (language_collection_1.Languages.find().cursor.count() === 0) {                                                 //
        var languages = [{                                                                                             //
                _id: "1000",                                                                                           //
                is_active: true,                                                                                       //
                language_code: 'es',                                                                                   //
                name: 'Español',                                                                                       //
                image: null                                                                                            //
            }, {                                                                                                       //
                _id: "2000",                                                                                           //
                is_active: true,                                                                                       //
                language_code: 'en',                                                                                   //
                name: 'English',                                                                                       //
                image: null                                                                                            //
            }, {                                                                                                       //
                _id: "3000",                                                                                           //
                is_active: false,                                                                                      //
                language_code: 'fr',                                                                                   //
                name: 'Français',                                                                                      //
                image: null                                                                                            //
            }, {                                                                                                       //
                _id: "4000",                                                                                           //
                is_active: false,                                                                                      //
                language_code: 'pt',                                                                                   //
                name: 'Portuguese',                                                                                    //
                image: null                                                                                            //
            }, {                                                                                                       //
                _id: "5000",                                                                                           //
                is_active: false,                                                                                      //
                language_code: 'it',                                                                                   //
                name: 'Italiano',                                                                                      //
                image: null                                                                                            //
            } /*,{                                                                                                     //
                    _id: "6000",                                                                                       //
                    is_active: true,                                                                                   //
                    language_code: 'al',                                                                               //
                    name: 'Deutsch',                                                                                   //
                    image: null                                                                                        //
                }*/                                                                                                    //
        ];                                                                                                             //
        languages.forEach(function (language) { return language_collection_1.Languages.insert(language); });           //
    }                                                                                                                  //
}                                                                                                                      // 47
exports.loadLanguages = loadLanguages;                                                                                 // 4
//# sourceMappingURL=languages.js.map                                                                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"publications":{"administration":{"additions.js":["meteor/meteor","../../../../both/collections/administration/addition.collection","../../../../both/collections/administration/item.collection","../../../../both/collections/auth/user-detail.collection","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/administration/additions.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var addition_collection_1 = require("../../../../both/collections/administration/addition.collection");                // 2
var item_collection_1 = require("../../../../both/collections/administration/item.collection");                        // 3
var user_detail_collection_1 = require("../../../../both/collections/auth/user-detail.collection");                    // 4
var check_1 = require("meteor/check");                                                                                 // 6
/**                                                                                                                    // 8
 * Meteor publication additions with creation user condition                                                           //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('additions', function (_userId) {                                                              // 12
    check_1.check(_userId, String);                                                                                    //
    return addition_collection_1.Additions.collection.find({ creation_user: _userId });                                //
});                                                                                                                    // 15
/**                                                                                                                    // 17
 * Meteor publication return additions with restaurant condition                                                       //
 * @param {string} _restaurantId                                                                                       //
 */                                                                                                                    //
meteor_1.Meteor.publish('additionsByRestaurant', function (_restaurantId) {                                            // 21
    check_1.check(_restaurantId, String);                                                                              //
    return addition_collection_1.Additions.collection.find({ 'restaurants.restaurantId': { $in: [_restaurantId] }, is_active: true });
});                                                                                                                    // 24
/**                                                                                                                    // 26
 * Meteor publication return additions with id condition                                                               //
 * @param {string} _pId                                                                                                //
 */                                                                                                                    //
meteor_1.Meteor.publish('additionsById', function (_pId) {                                                             // 30
    check_1.check(_pId, String);                                                                                       //
    return addition_collection_1.Additions.collection.find({ _id: _pId });                                             //
});                                                                                                                    // 33
/**                                                                                                                    // 35
 * Meteor publication return additions with userId condition                                                           //
 * @param {string} _restaurantId                                                                                       //
 */                                                                                                                    //
meteor_1.Meteor.publish('additionsByCurrentRestaurant', function (_userId) {                                           // 39
    check_1.check(_userId, String);                                                                                    //
    var _lUserDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                             //
    if (_lUserDetail) {                                                                                                //
        return addition_collection_1.Additions.collection.find({ 'restaurants.restaurantId': { $in: [_lUserDetail.current_restaurant] }, is_active: true });
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 47
/**                                                                                                                    // 49
 * Meteor publication return addtions by itemId  condition                                                             //
 * @param {string} _itemId                                                                                             //
*/                                                                                                                     //
meteor_1.Meteor.publish('additionsByItem', function (_itemId) {                                                        // 53
    check_1.check(_itemId, String);                                                                                    //
    var item = item_collection_1.Items.collection.findOne({ _id: _itemId, additionsIsAccepted: true });                //
    if (typeof item !== 'undefined') {                                                                                 //
        var aux = addition_collection_1.Additions.collection.find({ _id: { $in: item.additions } }).fetch();           //
        return addition_collection_1.Additions.collection.find({ _id: { $in: item.additions } });                      //
    }                                                                                                                  //
    else {                                                                                                             //
        return addition_collection_1.Additions.collection.find({ _id: { $in: [] } });                                  //
    }                                                                                                                  //
});                                                                                                                    // 63
/**                                                                                                                    // 65
 * Meteor publication additions by restaurant work                                                                     //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('additionsByRestaurantWork', function (_userId) {                                              // 69
    check_1.check(_userId, String);                                                                                    //
    var _lUserDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                             //
    if (_lUserDetail) {                                                                                                //
        return addition_collection_1.Additions.collection.find({ 'restaurants.restaurantId': { $in: [_lUserDetail.restaurant_work] }, is_active: true });
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 77
//# sourceMappingURL=additions.js.map                                                                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"categories.js":["meteor/meteor","../../../../both/collections/administration/category.collection","../../../../both/collections/auth/user-detail.collection","../../../../both/collections/administration/section.collection","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/administration/categories.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var category_collection_1 = require("../../../../both/collections/administration/category.collection");                // 2
var user_detail_collection_1 = require("../../../../both/collections/auth/user-detail.collection");                    // 3
var section_collection_1 = require("../../../../both/collections/administration/section.collection");                  // 4
var check_1 = require("meteor/check");                                                                                 // 5
/**                                                                                                                    // 7
 * Meteor publication categories with creation user condition                                                          //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('categories', function (_userId) {                                                             // 11
    check_1.check(_userId, String);                                                                                    //
    return category_collection_1.Categories.collection.find({ creation_user: _userId });                               //
});                                                                                                                    // 14
/**                                                                                                                    // 16
 * Meteor publication return categories with restaurant condition                                                      //
 * @param {string} _restaurantId                                                                                       //
 */                                                                                                                    //
meteor_1.Meteor.publish('categoriesByRestaurant', function (_restaurantId) {                                           // 20
    var _sections = [];                                                                                                //
    check_1.check(_restaurantId, String);                                                                              //
    section_collection_1.Sections.collection.find({ restaurants: { $in: [_restaurantId] } }).fetch().forEach(function (s) {
        _sections.push(s._id);                                                                                         //
    });                                                                                                                //
    return category_collection_1.Categories.collection.find({ section: { $in: _sections }, is_active: true });         //
});                                                                                                                    // 28
/**                                                                                                                    // 30
 * Meteor ppublication return categories by restaurant work                                                            //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getCategoriesByRestaurantWork', function (_userId) {                                          // 34
    check_1.check(_userId, String);                                                                                    //
    var _sections = [];                                                                                                //
    var user_detail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                              //
    section_collection_1.Sections.collection.find({ restaurants: { $in: [user_detail.restaurant_work] } }).fetch().forEach(function (s) {
        _sections.push(s._id);                                                                                         //
    });                                                                                                                //
    return category_collection_1.Categories.collection.find({ section: { $in: _sections }, is_active: true });         //
});                                                                                                                    // 42
//# sourceMappingURL=categories.js.map                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"garnish-food.js":["meteor/meteor","../../../../both/collections/administration/garnish-food.collection","../../../../both/collections/administration/item.collection","../../../../both/collections/auth/user-detail.collection","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/administration/garnish-food.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var garnish_food_collection_1 = require("../../../../both/collections/administration/garnish-food.collection");        // 2
var item_collection_1 = require("../../../../both/collections/administration/item.collection");                        // 3
var user_detail_collection_1 = require("../../../../both/collections/auth/user-detail.collection");                    // 4
var check_1 = require("meteor/check");                                                                                 // 6
/**                                                                                                                    // 8
 * Meteor publication garnishFood with creation user condition                                                         //
 * @param {String} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('garnishFood', function (_userId) {                                                            // 12
    check_1.check(_userId, String);                                                                                    //
    return garnish_food_collection_1.GarnishFoodCol.collection.find({ creation_user: _userId });                       //
});                                                                                                                    // 15
/**                                                                                                                    // 17
 * Meteor publication return garnish food with restaurant condition                                                    //
 * @param {string} _restaurantId                                                                                       //
 */                                                                                                                    //
meteor_1.Meteor.publish('garnishFoodByRestaurant', function (_restaurantId) {                                          // 21
    check_1.check(_restaurantId, String);                                                                              //
    return garnish_food_collection_1.GarnishFoodCol.collection.find({ 'restaurants.restaurantId': { $in: [_restaurantId] }, is_active: true });
});                                                                                                                    // 24
/**                                                                                                                    // 26
 * Meteor publication return garnish food with _id                                                                     //
 * @param {string} _pId                                                                                                //
 */                                                                                                                    //
meteor_1.Meteor.publish('garnishFoodById', function (_pId) {                                                           // 30
    check_1.check(_pId, String);                                                                                       //
    return garnish_food_collection_1.GarnishFoodCol.collection.find({ _id: _pId });                                    //
});                                                                                                                    // 33
/**                                                                                                                    // 35
 * Meteor publication return garnish food by itemId  condition                                                         //
 * @param {string}                                                                                                     //
 */                                                                                                                    //
meteor_1.Meteor.publish('garnishesByItem', function (_itemId) {                                                        // 39
    check_1.check(_itemId, String);                                                                                    //
    var item = item_collection_1.Items.collection.findOne({ _id: _itemId, garnishFoodIsAcceped: true });               //
    if (item) {                                                                                                        //
        return garnish_food_collection_1.GarnishFoodCol.collection.find({ _id: { $in: item.garnishFood } });           //
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 47
/**                                                                                                                    // 49
 * Meteor publication garnish food by restaurant work                                                                  //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('garnishFoodByRestaurantWork', function (_userId) {                                            // 53
    check_1.check(_userId, String);                                                                                    //
    var _lUserDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                             //
    if (_lUserDetail) {                                                                                                //
        return garnish_food_collection_1.GarnishFoodCol.collection.find({ 'restaurants.restaurantId': { $in: [_lUserDetail.restaurant_work] }, is_active: true });
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 61
//# sourceMappingURL=garnish-food.js.map                                                                               //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"item.js":["meteor/meteor","../../../../both/collections/administration/item.collection","../../../../both/collections/administration/section.collection","../../../../both/collections/auth/user-detail.collection","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/administration/item.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var item_collection_1 = require("../../../../both/collections/administration/item.collection");                        // 2
var section_collection_1 = require("../../../../both/collections/administration/section.collection");                  // 3
var user_detail_collection_1 = require("../../../../both/collections/auth/user-detail.collection");                    // 4
var check_1 = require("meteor/check");                                                                                 // 6
/**                                                                                                                    // 8
 * Meteor publication items with creation user condition                                                               //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('items', function (_userId) {                                                                  // 12
    check_1.check(_userId, String);                                                                                    //
    return item_collection_1.Items.collection.find({ creation_user: _userId });                                        //
});                                                                                                                    // 15
/**                                                                                                                    // 17
 * Meteor publication itemImages with user Id condition                                                                //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('itemImages', function (_userId) {                                                             // 21
    check_1.check(_userId, String);                                                                                    //
    return item_collection_1.ItemImages.collection.find({ userId: _userId });                                          //
});                                                                                                                    // 24
/**                                                                                                                    // 26
 * Meteor publication itemImageThumbs with user Id condition                                                           //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('itemImageThumbs', function (_userId) {                                                        // 30
    check_1.check(_userId, String);                                                                                    //
    return item_collection_1.ItemImagesThumbs.collection.find({ userId: _userId });                                    //
});                                                                                                                    // 33
/**                                                                                                                    // 35
 * Meteor publication return items with restaurant condition                                                           //
 */                                                                                                                    //
meteor_1.Meteor.publish('itemsByRestaurant', function (_restaurantId) {                                                // 38
    var _sections = [];                                                                                                //
    check_1.check(_restaurantId, String);                                                                              //
    section_collection_1.Sections.collection.find({ restaurants: { $in: [_restaurantId] } }).fetch().forEach(function (s) {
        _sections.push(s._id);                                                                                         //
    });                                                                                                                //
    return item_collection_1.Items.collection.find({ sectionId: { $in: _sections }, is_active: true });                //
});                                                                                                                    // 46
/**                                                                                                                    // 48
 * Meteor publication return items with user condition                                                                 //
 */                                                                                                                    //
meteor_1.Meteor.publish('itemsByUser', function (_userId) {                                                            // 51
    var _sections = [];                                                                                                //
    check_1.check(_userId, String);                                                                                    //
    var _lUserDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                             //
    if (_lUserDetail) {                                                                                                //
        if (_lUserDetail.current_restaurant) {                                                                         //
            section_collection_1.Sections.collection.find({ restaurants: { $in: [_lUserDetail.current_restaurant] } }).fetch().forEach(function (s) {
                _sections.push(s._id);                                                                                 //
            });                                                                                                        //
            return item_collection_1.Items.collection.find({ sectionId: { $in: _sections }, is_active: true });        //
        }                                                                                                              //
        else {                                                                                                         //
            return;                                                                                                    //
        }                                                                                                              //
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 68
/**                                                                                                                    // 70
 * Meteor publication return item images with restaurant condition                                                     //
 */                                                                                                                    //
meteor_1.Meteor.publish('itemImagesByRestaurant', function (_restaurantId) {                                           // 73
    var _sections = [];                                                                                                //
    var _items = [];                                                                                                   //
    check_1.check(_restaurantId, String);                                                                              //
    section_collection_1.Sections.collection.find({ restaurants: { $in: [_restaurantId] } }).fetch().forEach(function (s) {
        _sections.push(s._id);                                                                                         //
    });                                                                                                                //
    item_collection_1.Items.collection.find({ sectionId: { $in: _sections }, is_active: true }).fetch().forEach(function (i) {
        _items.push(i._id);                                                                                            //
    });                                                                                                                //
    return item_collection_1.ItemImages.collection.find({ itemId: { $in: _items } });                                  //
});                                                                                                                    // 85
/**                                                                                                                    // 87
 * Meteor publication return item thumbs images with restaurant condition                                              //
 */                                                                                                                    //
meteor_1.Meteor.publish('itemImageThumbsByRestaurant', function (_restaurantId) {                                      // 90
    var _sections = [];                                                                                                //
    var _items = [];                                                                                                   //
    check_1.check(_restaurantId, String);                                                                              //
    section_collection_1.Sections.collection.find({ restaurants: { $in: [_restaurantId] } }).fetch().forEach(function (s) {
        _sections.push(s._id);                                                                                         //
    });                                                                                                                //
    item_collection_1.Items.collection.find({ sectionId: { $in: _sections }, is_active: true }).fetch().forEach(function (i) {
        _items.push(i._id);                                                                                            //
    });                                                                                                                //
    return item_collection_1.ItemImagesThumbs.collection.find({ itemId: { $in: _items } });                            //
});                                                                                                                    // 102
/**                                                                                                                    // 104
 * Meteor publication return item thumbs images with user id condition                                                 //
 */                                                                                                                    //
meteor_1.Meteor.publish('itemImageThumbsByUserId', function (_userId) {                                                // 107
    var _sections = [];                                                                                                //
    var _items = [];                                                                                                   //
    check_1.check(_userId, String);                                                                                    //
    var _lUserDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                             //
    if (_lUserDetail) {                                                                                                //
        if (_lUserDetail.current_restaurant) {                                                                         //
            section_collection_1.Sections.collection.find({ restaurants: { $in: [_lUserDetail.current_restaurant] } }).fetch().forEach(function (s) {
                _sections.push(s._id);                                                                                 //
            });                                                                                                        //
            item_collection_1.Items.collection.find({ sectionId: { $in: _sections }, is_active: true }).fetch().forEach(function (i) {
                _items.push(i._id);                                                                                    //
            });                                                                                                        //
            return item_collection_1.ItemImagesThumbs.collection.find({ itemId: { $in: _items } });                    //
        }                                                                                                              //
        else {                                                                                                         //
            return;                                                                                                    //
        }                                                                                                              //
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 128
/**                                                                                                                    // 130
 * Meteor publication return item by id                                                                                //
 */                                                                                                                    //
meteor_1.Meteor.publish('itemById', function (_itemId) {                                                               // 133
    check_1.check(_itemId, String);                                                                                    //
    return item_collection_1.Items.collection.find({ _id: _itemId });                                                  //
});                                                                                                                    // 136
/**                                                                                                                    // 138
 * Meteor publication return items by restaurant work                                                                  //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getItemsByRestaurantWork', function (_userId) {                                               // 142
    check_1.check(_userId, String);                                                                                    //
    var _lUserDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                             //
    var _sections = [];                                                                                                //
    if (_lUserDetail) {                                                                                                //
        section_collection_1.Sections.collection.find({ restaurants: { $in: [_lUserDetail.restaurant_work] } }).fetch().forEach(function (s) {
            _sections.push(s._id);                                                                                     //
        });                                                                                                            //
        return item_collection_1.Items.collection.find({ sectionId: { $in: _sections }, is_active: true });            //
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 155
/**                                                                                                                    // 157
 * Meteor publication return items thumbs by restaurant work                                                           //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getItemImageThumbsByRestaurantWork', function (_userId) {                                     // 161
    check_1.check(_userId, String);                                                                                    //
    var _lUserDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                             //
    var _sections = [];                                                                                                //
    var _items = [];                                                                                                   //
    if (_lUserDetail) {                                                                                                //
        section_collection_1.Sections.collection.find({ restaurants: { $in: [_lUserDetail.restaurant_work] } }).fetch().forEach(function (s) {
            _sections.push(s._id);                                                                                     //
        });                                                                                                            //
        item_collection_1.Items.collection.find({ sectionId: { $in: _sections }, is_active: true }).fetch().forEach(function (it) {
            _items.push(it._id);                                                                                       //
        });                                                                                                            //
        return item_collection_1.ItemImagesThumbs.collection.find({ itemId: { $in: _items } });                        //
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 178
/**                                                                                                                    // 180
 * Meteor publication return items images by restaurant work                                                           //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getItemImageByRestaurantWork', function (_userId) {                                           // 184
    check_1.check(_userId, String);                                                                                    //
    var _lUserDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                             //
    var _sections = [];                                                                                                //
    var _items = [];                                                                                                   //
    if (_lUserDetail) {                                                                                                //
        section_collection_1.Sections.collection.find({ restaurants: { $in: [_lUserDetail.restaurant_work] } }).fetch().forEach(function (s) {
            _sections.push(s._id);                                                                                     //
        });                                                                                                            //
        item_collection_1.Items.collection.find({ sectionId: { $in: _sections }, is_active: true }).fetch().forEach(function (it) {
            _items.push(it._id);                                                                                       //
        });                                                                                                            //
        return item_collection_1.ItemImages.collection.find({ itemId: { $in: _items } });                              //
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 200
/**                                                                                                                    // 203
 * Meteor publication return restaurants items                                                                         //
 * @param {string[]} _pRestaurantIds                                                                                   //
 */                                                                                                                    //
meteor_1.Meteor.publish('getItemsByRestaurantIds', function (_pRestaurantIds) {                                        // 207
    return item_collection_1.Items.collection.find({ 'restaurants.restaurantId': { $in: _pRestaurantIds } });          //
});                                                                                                                    // 209
/**                                                                                                                    // 212
 * Meetor publication return items by restaurant work                                                                  //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getItemsByUserRestaurantWork', function (_userId) {                                           // 216
    check_1.check(_userId, String);                                                                                    //
    var _lUserDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                             //
    if (_lUserDetail) {                                                                                                //
        return item_collection_1.Items.collection.find({ 'restaurants.restaurantId': { $in: [_lUserDetail.restaurant_work] }, is_active: true });
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 225
/**                                                                                                                    // 227
 * Meteor publication return all itemImages                                                                            //
 */                                                                                                                    //
meteor_1.Meteor.publish('allItemImages', function () {                                                                 // 230
    return item_collection_1.ItemImages.collection.find({});                                                           //
});                                                                                                                    // 232
//# sourceMappingURL=item.js.map                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"promotions.js":["meteor/meteor","../../../../both/collections/administration/promotion.collection","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/administration/promotions.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var promotion_collection_1 = require("../../../../both/collections/administration/promotion.collection");              // 2
var check_1 = require("meteor/check");                                                                                 // 3
/**                                                                                                                    // 5
 * Meteor publication promotions with creation user condition                                                          //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('promotions', function (_userId) {                                                             // 9
    check_1.check(_userId, String);                                                                                    //
    return promotion_collection_1.Promotions.collection.find({ creation_user: _userId });                              //
});                                                                                                                    // 12
/**                                                                                                                    // 14
 * Meteor publication promotionImages with user Id condition                                                           //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('promotionImages', function (_userId) {                                                        // 18
    check_1.check(_userId, String);                                                                                    //
    return promotion_collection_1.PromotionImages.collection.find({ userId: _userId });                                //
});                                                                                                                    // 21
/**                                                                                                                    // 23
 * Meteor publication promotionImageThumbs with user Id condition                                                      //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('promotionImageThumbs', function (_userId) {                                                   // 27
    return promotion_collection_1.PromotionImagesThumbs.collection.find({ userId: _userId });                          //
});                                                                                                                    // 29
//# sourceMappingURL=promotions.js.map                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"sections.js":["meteor/meteor","../../../../both/collections/administration/section.collection","../../../../both/collections/auth/user-detail.collection","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/administration/sections.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var section_collection_1 = require("../../../../both/collections/administration/section.collection");                  // 2
var user_detail_collection_1 = require("../../../../both/collections/auth/user-detail.collection");                    // 3
var check_1 = require("meteor/check");                                                                                 // 4
/**                                                                                                                    // 6
 * Meteor publication section with creation user condition                                                             //
 * @param {String} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('sections', function (_userId) {                                                               // 10
    check_1.check(_userId, String);                                                                                    //
    return section_collection_1.Sections.collection.find({ creation_user: _userId });                                  //
});                                                                                                                    // 13
/**                                                                                                                    // 15
 * Meteor publication restaurants sections                                                                             //
 * @param {string} _restaurantId                                                                                       //
*/                                                                                                                     //
meteor_1.Meteor.publish('sectionsByRestaurant', function (_restaurantId) {                                             // 19
    check_1.check(_restaurantId, String);                                                                              //
    return section_collection_1.Sections.collection.find({ restaurants: { $in: [_restaurantId] }, is_active: true });  //
});                                                                                                                    // 22
meteor_1.Meteor.publish('getSections', function () {                                                                   // 24
    return section_collection_1.Sections.find({});                                                                     //
});                                                                                                                    // 26
/**                                                                                                                    // 28
 * Meteor publication restaurants sections by restaurant work                                                          //
 * @param {string} _userId                                                                                             //
*/                                                                                                                     //
meteor_1.Meteor.publish('getSectionsByRestaurantWork', function (_userId) {                                            // 32
    check_1.check(_userId, String);                                                                                    //
    var user_detail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                              //
    return section_collection_1.Sections.collection.find({ restaurants: { $in: [user_detail.restaurant_work] }, is_active: true });
});                                                                                                                    // 36
//# sourceMappingURL=sections.js.map                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"subcategories.js":["meteor/meteor","../../../../both/collections/administration/subcategory.collection","../../../../both/collections/administration/section.collection","../../../../both/collections/administration/category.collection","../../../../both/collections/auth/user-detail.collection","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/administration/subcategories.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var subcategory_collection_1 = require("../../../../both/collections/administration/subcategory.collection");          // 2
var section_collection_1 = require("../../../../both/collections/administration/section.collection");                  // 3
var category_collection_1 = require("../../../../both/collections/administration/category.collection");                // 4
var user_detail_collection_1 = require("../../../../both/collections/auth/user-detail.collection");                    // 5
var check_1 = require("meteor/check");                                                                                 // 6
/**                                                                                                                    // 8
 * Meteor publication subcategories with creation user condition                                                       //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('subcategories', function (_userId) {                                                          // 12
    check_1.check(_userId, String);                                                                                    //
    return subcategory_collection_1.Subcategories.collection.find({ creation_user: _userId });                         //
});                                                                                                                    // 15
/**                                                                                                                    // 17
 * Meteor publication return subcategories with restaurant condition                                                   //
 * @param {string} _restaurantId                                                                                       //
 */                                                                                                                    //
meteor_1.Meteor.publish('subcategoriesByRestaurant', function (_restaurantId) {                                        // 21
    var _sections = [];                                                                                                //
    var _categories = [];                                                                                              //
    check_1.check(_restaurantId, String);                                                                              //
    section_collection_1.Sections.collection.find({ restaurants: { $in: [_restaurantId] } }).fetch().forEach(function (s) {
        _sections.push(s._id);                                                                                         //
    });                                                                                                                //
    category_collection_1.Categories.collection.find({ section: { $in: _sections } }).fetch().forEach(function (c) {   //
        _categories.push(c._id);                                                                                       //
    });                                                                                                                //
    return subcategory_collection_1.Subcategories.collection.find({ category: { $in: _categories }, is_active: true });
});                                                                                                                    // 33
/**                                                                                                                    // 36
 * Meteor publication return subcategories by restaurant work                                                          //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getSubcategoriesByRestaurantWork', function (_userId) {                                       // 40
    check_1.check(_userId, String);                                                                                    //
    var _sections = [];                                                                                                //
    var _categories = [];                                                                                              //
    var user_detail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                              //
    section_collection_1.Sections.collection.find({ restaurants: { $in: [user_detail.restaurant_work] } }).fetch().forEach(function (s) {
        _sections.push(s._id);                                                                                         //
    });                                                                                                                //
    category_collection_1.Categories.collection.find({ section: { $in: _sections } }).fetch().forEach(function (c) {   //
        _categories.push(c._id);                                                                                       //
    });                                                                                                                //
    return subcategory_collection_1.Subcategories.collection.find({ category: { $in: _categories }, is_active: true });
});                                                                                                                    // 52
//# sourceMappingURL=subcategories.js.map                                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"auth":{"collaborators.js":["meteor/meteor","meteor/check","../../../../both/collections/auth/user.collection","../../../../both/collections/auth/user-detail.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/auth/collaborators.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var check_1 = require("meteor/check");                                                                                 // 2
var user_collection_1 = require("../../../../both/collections/auth/user.collection");                                  // 3
var user_detail_collection_1 = require("../../../../both/collections/auth/user-detail.collection");                    // 4
meteor_1.Meteor.publish('getUsersDetailsForRestaurant', function (_restaurant_work) {                                  // 9
    if (_restaurant_work) {                                                                                            //
        return user_detail_collection_1.UserDetails.find({ restaurant_work: _restaurant_work });                       //
    }                                                                                                                  //
});                                                                                                                    // 13
meteor_1.Meteor.publish('getUsersByRestaurant', function (_restaurant_work) {                                          // 15
    if (_restaurant_work) {                                                                                            //
        var _lUserDetails_1 = [];                                                                                      //
        check_1.check(_restaurant_work, String);                                                                       //
        user_detail_collection_1.UserDetails.collection.find({ restaurant_work: _restaurant_work }).fetch().forEach(function (usdet) {
            _lUserDetails_1.push(usdet.user_id);                                                                       //
        });                                                                                                            //
        return user_collection_1.Users.find({ _id: { $in: _lUserDetails_1 } });                                        //
    }                                                                                                                  //
});                                                                                                                    // 25
/**                                                                                                                    // 27
 * Get users with role '200' by current restaurant.                                                                    //
 * @param { string } _usrId                                                                                            //
 */ ;                                                                                                                  //
meteor_1.Meteor.publish('getWaitersByCurrentRestaurant', function (_usrId) {                                           // 31
    var _lUserDetail = user_detail_collection_1.UserDetails.collection.find({ user_id: _usrId }).fetch()[0];           //
    if (_lUserDetail) {                                                                                                //
        return user_detail_collection_1.UserDetails.find({ restaurant_work: _lUserDetail.current_restaurant, role_id: '200' });
    }                                                                                                                  //
});                                                                                                                    // 36
//# sourceMappingURL=collaborators.js.map                                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"menus.js":["meteor/meteor","../../../../both/collections/auth/menu.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/auth/menus.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var menu_collection_1 = require("../../../../both/collections/auth/menu.collection");                                  // 4
meteor_1.Meteor.publish('getMenus', function () {                                                                      // 7
    return menu_collection_1.Menus.find({}, { sort: { order: 1 } });                                                   //
});                                                                                                                    // 9
//# sourceMappingURL=menus.js.map                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"roles.js":["meteor/meteor","../../../../both/collections/auth/role.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/auth/roles.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var role_collection_1 = require("../../../../both/collections/auth/role.collection");                                  // 4
meteor_1.Meteor.publish('getRoleComplete', function () {                                                               // 6
    return role_collection_1.Roles.find({});                                                                           //
});                                                                                                                    // 8
meteor_1.Meteor.publish('getRoleCollaborators', function () {                                                          // 10
    return role_collection_1.Roles.find({ _id: { $in: ["200", "500", "600"] } });                                      //
});                                                                                                                    // 12
//# sourceMappingURL=roles.js.map                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"user-details.js":["meteor/meteor","../../../../both/collections/auth/user-detail.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/auth/user-details.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var user_detail_collection_1 = require("../../../../both/collections/auth/user-detail.collection");                    // 2
meteor_1.Meteor.publish('getUsersDetails', function () {                                                               // 5
    return user_detail_collection_1.UserDetails.find({});                                                              //
});                                                                                                                    // 7
meteor_1.Meteor.publish('getUserDetailsByUser', function (_userId) {                                                   // 10
    check(_userId, String);                                                                                            //
    return user_detail_collection_1.UserDetails.find({ user_id: _userId });                                            //
});                                                                                                                    // 13
meteor_1.Meteor.publish('getUserDetailsByCurrentTable', function (_restaurantId, _tableId) {                           // 15
    return user_detail_collection_1.UserDetails.find({ current_restaurant: _restaurantId, current_table: _tableId });  //
});                                                                                                                    // 17
/**                                                                                                                    // 19
 * Meteor publication return users by restaurants Id                                                                   //
 * @param {string[]} _pRestaurantsId                                                                                   //
 */                                                                                                                    //
meteor_1.Meteor.publish('getUsersByRestaurantsId', function (_pRestaurantsId) {                                        // 23
    return user_detail_collection_1.UserDetails.find({ current_restaurant: { $in: _pRestaurantsId } });                //
});                                                                                                                    // 25
//# sourceMappingURL=user-details.js.map                                                                               //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"users.js":["meteor/meteor","../../../../both/collections/auth/user.collection","../../../../both/collections/auth/user-detail.collection","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/auth/users.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var user_collection_1 = require("../../../../both/collections/auth/user.collection");                                  // 2
var user_detail_collection_1 = require("../../../../both/collections/auth/user-detail.collection");                    // 3
var check_1 = require("meteor/check");                                                                                 // 4
/*Meteor.publish('getUserProfile', function () {                                                                       // 6
    return Users.find({_id: this.userId});                                                                             //
});*/                                                                                                                  //
meteor_1.Meteor.publish('getUserSettings', function () {                                                               // 10
    return user_collection_1.Users.find({ _id: this.userId }, { fields: { username: 1, "services.profile.name": 1, "services.facebook": 1, "services.twitter": 1, "services.google": 1 } });
});                                                                                                                    // 12
/**                                                                                                                    // 14
 * Meteor publish, get all users                                                                                       //
 */                                                                                                                    //
meteor_1.Meteor.publish('getUsers', function () {                                                                      // 17
    return user_collection_1.Users.find({});                                                                           //
});                                                                                                                    // 19
/**                                                                                                                    // 21
 * Meteor publish. Get user by Id                                                                                      //
 */                                                                                                                    //
meteor_1.Meteor.publish('getUserByUserId', function (_usrId) {                                                         // 24
    return user_collection_1.Users.find({ _id: _usrId });                                                              //
});                                                                                                                    // 26
/**                                                                                                                    // 28
 * Meteor publication return users with restaurant and table Id conditions                                             //
 * @param {string} _pRestaurantId                                                                                      //
 * @param {string} _pTableId                                                                                           //
 */                                                                                                                    //
meteor_1.Meteor.publish('getUserByTableId', function (_pRestaurantId, _pTableId) {                                     // 33
    check_1.check(_pRestaurantId, String);                                                                             //
    check_1.check(_pTableId, String);                                                                                  //
    var _lUsers = [];                                                                                                  //
    user_detail_collection_1.UserDetails.find({ current_restaurant: _pRestaurantId, current_table: _pTableId }).fetch().forEach(function (user) {
        _lUsers.push(user.user_id);                                                                                    //
    });                                                                                                                //
    return user_collection_1.Users.find({ _id: { $in: _lUsers } });                                                    //
});                                                                                                                    // 41
/**                                                                                                                    // 43
 * Meteor publication return user image                                                                                //
 */                                                                                                                    //
meteor_1.Meteor.publish('getUserImages', function (_pUserId) {                                                         // 46
    check_1.check(_pUserId, String);                                                                                   //
    return user_collection_1.UserImages.find({ userId: _pUserId });                                                    //
});                                                                                                                    // 49
//# sourceMappingURL=users.js.map                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"general":{"currency.js":["meteor/meteor","../../../../both/collections/general/currency.collection","../../../../both/collections/restaurant/restaurant.collection","../../../../both/collections/auth/user-detail.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/general/currency.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var currency_collection_1 = require("../../../../both/collections/general/currency.collection");                       // 2
var restaurant_collection_1 = require("../../../../both/collections/restaurant/restaurant.collection");                // 3
var user_detail_collection_1 = require("../../../../both/collections/auth/user-detail.collection");                    // 5
/**                                                                                                                    // 7
 * Meteor publication currencies                                                                                       //
 */                                                                                                                    //
meteor_1.Meteor.publish('currencies', function () { return currency_collection_1.Currencies.find({ isActive: true }); });
/**                                                                                                                    // 12
 * Meteor publication return currencies by restaurants Id                                                              //
 */                                                                                                                    //
meteor_1.Meteor.publish('getCurrenciesByRestaurantsId', function (_restaurantsId) {                                    // 15
    var _ids = [];                                                                                                     //
    restaurant_collection_1.Restaurants.collection.find({ _id: { $in: _restaurantsId } }).forEach(function (restaurant) {
        _ids.push(restaurant.currencyId);                                                                              //
    });                                                                                                                //
    return currency_collection_1.Currencies.collection.find({ _id: { $in: _ids } });                                   //
});                                                                                                                    // 21
/**                                                                                                                    // 23
 * Meteor publication return currencies by  userId                                                                     //
 */                                                                                                                    //
meteor_1.Meteor.publish('getCurrenciesByUserId', function () {                                                         // 26
    var _currenciesIds = [];                                                                                           //
    restaurant_collection_1.Restaurants.collection.find({ creation_user: this.userId }).forEach(function (restaurant) {
        _currenciesIds.push(restaurant.currencyId);                                                                    //
    });                                                                                                                //
    return currency_collection_1.Currencies.collection.find({ _id: { $in: _currenciesIds } });                         //
});                                                                                                                    // 33
/**                                                                                                                    // 35
 * Meteor publication return currencies by                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getCurrenciesByCurrentUser', function (_userId) {                                             // 38
    var _userDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                              //
    if (_userDetail.current_restaurant != '') {                                                                        //
        var _restaurant = restaurant_collection_1.Restaurants.findOne({ _id: _userDetail.current_restaurant });        //
        return currency_collection_1.Currencies.collection.find({ _id: _restaurant.currencyId });                      //
    }                                                                                                                  //
    else {                                                                                                             //
        return currency_collection_1.Currencies.collection.find({ _id: '0' });                                         //
    }                                                                                                                  //
});                                                                                                                    // 47
/**                                                                                                                    // 49
 * Meteor publication return currency by restaurant work                                                               //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getCurrenciesByRestaurantWork', function (_userId) {                                          // 53
    var _userDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                              //
    var _currenciesIds = [];                                                                                           //
    if (_userDetail.restaurant_work != '') {                                                                           //
        var _restaurant = restaurant_collection_1.Restaurants.findOne({ _id: _userDetail.restaurant_work });           //
        return currency_collection_1.Currencies.collection.find({ _id: _restaurant.currencyId });                      //
    }                                                                                                                  //
    else {                                                                                                             //
        return currency_collection_1.Currencies.collection.find({ _id: '0' });                                         //
    }                                                                                                                  //
});                                                                                                                    // 62
//# sourceMappingURL=currency.js.map                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"email-content.js":["meteor/meteor","../../../../both/collections/general/email-content.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/general/email-content.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var email_content_collection_1 = require("../../../../both/collections/general/email-content.collection");             // 2
/**                                                                                                                    // 4
 * Meteor publication EmailContents                                                                                    //
 */                                                                                                                    //
meteor_1.Meteor.publish('getEmailContents', function () {                                                              // 7
    return email_content_collection_1.EmailContents.find({});                                                          //
});                                                                                                                    // 9
//# sourceMappingURL=email-content.js.map                                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"hour.js":["meteor/meteor","../../../../both/collections/general/hours.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/general/hour.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var hours_collection_1 = require("../../../../both/collections/general/hours.collection");                             // 2
/**                                                                                                                    // 4
 * Meteor publication hours                                                                                            //
 */                                                                                                                    //
meteor_1.Meteor.publish('hours', function () { return hours_collection_1.Hours.find(); });                             // 7
//# sourceMappingURL=hour.js.map                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"parameter.js":["meteor/meteor","../../../../both/collections/general/parameter.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/general/parameter.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var parameter_collection_1 = require("../../../../both/collections/general/parameter.collection");                     // 2
/**                                                                                                                    // 4
 * Meteor publication EmailContents                                                                                    //
 */                                                                                                                    //
meteor_1.Meteor.publish('getParameters', function () {                                                                 // 7
    return parameter_collection_1.Parameters.find({});                                                                 //
});                                                                                                                    // 9
//# sourceMappingURL=parameter.js.map                                                                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"paymentMethod.js":["meteor/meteor","../../../../both/collections/general/paymentMethod.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/general/paymentMethod.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var paymentMethod_collection_1 = require("../../../../both/collections/general/paymentMethod.collection");             // 2
/**                                                                                                                    // 4
 * Meteor publication paymentMethods                                                                                   //
 */                                                                                                                    //
meteor_1.Meteor.publish('paymentMethods', function () { return paymentMethod_collection_1.PaymentMethods.find({ isActive: true }); });
//# sourceMappingURL=paymentMethod.js.map                                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"payment":{"cc-payment-method.js":["meteor/meteor","../../../../both/collections/payment/cc-payment-methods.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/payment/cc-payment-method.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var cc_payment_methods_collection_1 = require("../../../../both/collections/payment/cc-payment-methods.collection");   // 2
/**                                                                                                                    // 4
 * Meteor publication EmailContents                                                                                    //
 */                                                                                                                    //
meteor_1.Meteor.publish('getCcPaymentMethods', function () {                                                           // 7
    return cc_payment_methods_collection_1.CcPaymentMethods.find({ is_active: true });                                 //
});                                                                                                                    // 9
//# sourceMappingURL=cc-payment-method.js.map                                                                          //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"payment-history.js":["meteor/meteor","../../../../both/collections/payment/payment-history.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/payment/payment-history.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var payment_history_collection_1 = require("../../../../both/collections/payment/payment-history.collection");         // 2
/**                                                                                                                    // 4
 * Meteor publication EmailContents                                                                                    //
 */                                                                                                                    //
meteor_1.Meteor.publish('getHistoryPaymentsByUser', function (_userId) {                                               // 7
    return payment_history_collection_1.PaymentsHistory.find({ creation_user: _userId }, { sort: { creation_date: -1 } });
});                                                                                                                    // 9
//# sourceMappingURL=payment-history.js.map                                                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"payment-transaction.js":["meteor/meteor","../../../../both/collections/payment/payment-transaction.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/payment/payment-transaction.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var payment_transaction_collection_1 = require("../../../../both/collections/payment/payment-transaction.collection");
/**                                                                                                                    // 4
 * Meteor publication EmailContents                                                                                    //
 */                                                                                                                    //
meteor_1.Meteor.publish('getTransactions', function () {                                                               // 7
    return payment_transaction_collection_1.PaymentTransactions.find({});                                              //
});                                                                                                                    // 9
meteor_1.Meteor.publish('getTransactionsByUser', function (_userId) {                                                  // 11
    return payment_transaction_collection_1.PaymentTransactions.find({ creation_user: _userId });                      //
});                                                                                                                    // 13
//# sourceMappingURL=payment-transaction.js.map                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"restaurant":{"account.js":["meteor/meteor","../../../../both/collections/restaurant/account.collection","../../../../both/collections/auth/user-detail.collection","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/restaurant/account.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var account_collection_1 = require("../../../../both/collections/restaurant/account.collection");                      // 2
var user_detail_collection_1 = require("../../../../both/collections/auth/user-detail.collection");                    // 4
var check_1 = require("meteor/check");                                                                                 // 5
/**                                                                                                                    // 7
 * Meteor publication accounts with restaurantId condition and tableId condition                                       //
 * @param {string} _restaurantId                                                                                       //
 * @param {string} _status                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getAccountsByTableRestaurant', function (_restaurantId, _status) {                            // 12
    check_1.check(_restaurantId, String);                                                                              //
    check_1.check(_status, String);                                                                                    //
    return account_collection_1.Accounts.collection.find({ restaurantId: _restaurantId, status: _status });            //
});                                                                                                                    // 16
/**                                                                                                                    // 18
 * Meteor publication account by tableId                                                                               //
 * @param {string} _tableId                                                                                            //
 */                                                                                                                    //
meteor_1.Meteor.publish('getAccountsByTableId', function (_tableId) {                                                  // 22
    check_1.check(_tableId, String);                                                                                   //
    return account_collection_1.Accounts.collection.find({ tableId: _tableId });                                       //
});                                                                                                                    // 25
/**                                                                                                                    // 27
 * Meteor publication account by userId                                                                                //
 * @param {string} userId                                                                                              //
 */                                                                                                                    //
meteor_1.Meteor.publish('getAccountsByUserId', function (_userId) {                                                    // 31
    check_1.check(_userId, String);                                                                                    //
    var _lUserDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                             //
    if (_lUserDetail) {                                                                                                //
        if (_lUserDetail.current_restaurant !== "" && _lUserDetail.current_table !== "") {                             //
            return account_collection_1.Accounts.collection.find({ restaurantId: _lUserDetail.current_restaurant, tableId: _lUserDetail.current_table });
        }                                                                                                              //
        else {                                                                                                         //
            return;                                                                                                    //
        }                                                                                                              //
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 44
//# sourceMappingURL=account.js.map                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"invoice.js":["meteor/meteor","meteor/check","../../../../both/collections/restaurant/invoice.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/restaurant/invoice.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var check_1 = require("meteor/check");                                                                                 // 2
var invoice_collection_1 = require("../../../../both/collections/restaurant/invoice.collection");                      // 3
/**                                                                                                                    // 5
 * This method return Invoices by UserId                                                                               //
 * @param {string} _pUserId                                                                                            //
 */                                                                                                                    //
meteor_1.Meteor.publish('getInvoicesByUserId', function (_pUserId) {                                                   // 9
    check_1.check(_pUserId, String);                                                                                   //
    return invoice_collection_1.Invoices.collection.find({ customer_id: _pUserId });                                   //
});                                                                                                                    // 12
//# sourceMappingURL=invoice.js.map                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"order.js":["meteor/meteor","../../../../both/collections/restaurant/order.collection","meteor/check","../../../../both/collections/restaurant/table.collection","../../../../both/collections/auth/user-detail.collection","../../../../both/collections/restaurant/account.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/restaurant/order.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var order_collection_1 = require("../../../../both/collections/restaurant/order.collection");                          // 2
var check_1 = require("meteor/check");                                                                                 // 3
var table_collection_1 = require("../../../../both/collections/restaurant/table.collection");                          // 5
var user_detail_collection_1 = require("../../../../both/collections/auth/user-detail.collection");                    // 6
var account_collection_1 = require("../../../../both/collections/restaurant/account.collection");                      // 9
/**                                                                                                                    // 11
 * Meteor publication orders with restaurantId and status conditions                                                   //
 * @param {string} _restaurantId                                                                                       //
 * @param {string} _status                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getOrders', function (_restaurantId, _tableQRCode, _status) {                                 // 16
    check_1.check(_restaurantId, String);                                                                              //
    check_1.check(_tableQRCode, String);                                                                               //
    var _lTable = table_collection_1.Tables.collection.findOne({ QR_code: _tableQRCode });                             //
    var _lAccount = account_collection_1.Accounts.findOne({ restaurantId: _restaurantId, tableId: _lTable._id, status: 'OPEN' });
    if (_lTable && _lAccount) {                                                                                        //
        return order_collection_1.Orders.collection.find({ accountId: _lAccount._id, restaurantId: _restaurantId, tableId: _lTable._id, status: { $in: _status } });
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 27
/**                                                                                                                    // 29
 * Meteor publications orders with restaurantId and status conditions                                                  //
 * @param {string}                                                                                                     //
 * @param {string}                                                                                                     //
*/                                                                                                                     //
meteor_1.Meteor.publish('getOrdersByTableId', function (_restaurantId, _tableId, _status) {                            // 34
    check_1.check(_restaurantId, String);                                                                              //
    var _lAccount = account_collection_1.Accounts.findOne({ restaurantId: _restaurantId, tableId: _tableId, status: 'OPEN' });
    return order_collection_1.Orders.collection.find({ accountId: _lAccount._id, restaurantId: _restaurantId, tableId: _tableId, status: { $in: _status } });
});                                                                                                                    // 38
/**                                                                                                                    // 40
 * Meteor publications orders with userId and status conditions                                                        //
 * @param {string}                                                                                                     //
 * @param {string}                                                                                                     //
*/                                                                                                                     //
meteor_1.Meteor.publish('getOrdersByUserId', function (_userId, _status) {                                             // 45
    check_1.check(_userId, String);                                                                                    //
    var _lUserDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                             //
    if (_lUserDetail) {                                                                                                //
        if (_lUserDetail.current_restaurant && _lUserDetail.current_table) {                                           //
            var _lAccount = account_collection_1.Accounts.findOne({ restaurantId: _lUserDetail.current_restaurant,     //
                tableId: _lUserDetail.current_table,                                                                   //
                status: 'OPEN' });                                                                                     //
            return order_collection_1.Orders.collection.find({ accountId: _lAccount._id, restaurantId: _lAccount.restaurantId, tableId: _lAccount.tableId, status: { $in: _status } });
        }                                                                                                              //
        else {                                                                                                         //
            return;                                                                                                    //
        }                                                                                                              //
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 60
/**                                                                                                                    // 62
 * Meteor publication orders with restaurantId condition                                                               //
 * @param {string} _restaurantId                                                                                       //
*/                                                                                                                     //
meteor_1.Meteor.publish('getOrdersByRestaurantId', function (_restaurantId, _status) {                                 // 66
    check_1.check(_restaurantId, String);                                                                              //
    return order_collection_1.Orders.collection.find({ restaurantId: _restaurantId, status: { $in: _status } });       //
});                                                                                                                    // 69
/**                                                                                                                    // 71
 * Meteor publication orders by restaurant work                                                                        //
 * @param {string} _userId                                                                                             //
 * @param {sring[]} _status                                                                                            //
 */                                                                                                                    //
meteor_1.Meteor.publish('getOrdersByRestaurantWork', function (_userId, _status) {                                     // 76
    check_1.check(_userId, String);                                                                                    //
    var _lUserDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                             //
    if (_lUserDetail) {                                                                                                //
        return order_collection_1.Orders.collection.find({ restaurantId: _lUserDetail.restaurant_work, status: { $in: _status } });
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 84
/**                                                                                                                    // 87
 * Meteor publication orders by account                                                                                //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getOrdersByAccount', function (_userId) {                                                     // 91
    check_1.check(_userId, String);                                                                                    //
    var _lUserDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                             //
    if (_lUserDetail) {                                                                                                //
        if (_lUserDetail.current_restaurant !== "" && _lUserDetail.current_table !== "") {                             //
            var _lAccount = account_collection_1.Accounts.findOne({ restaurantId: _lUserDetail.current_restaurant,     //
                tableId: _lUserDetail.current_table,                                                                   //
                status: 'OPEN' });                                                                                     //
            return order_collection_1.Orders.find({ creation_user: _userId, restaurantId: _lAccount.restaurantId, tableId: _lAccount.tableId, status: 'ORDER_STATUS.DELIVERED' });
        }                                                                                                              //
        else {                                                                                                         //
            return order_collection_1.Orders.find({ creation_user: _userId, restaurantId: "", tableId: "", status: "" });
        }                                                                                                              //
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 106
/**                                                                                                                    // 108
 * Meteor publication return orders with translate confirmation pending                                                //
 */                                                                                                                    //
meteor_1.Meteor.publish('getOrdersWithConfirmationPending', function (_restaurantId, _tableId) {                       // 111
    check_1.check(_restaurantId, String);                                                                              //
    check_1.check(_tableId, String);                                                                                   //
    var _lAccount = account_collection_1.Accounts.findOne({ restaurantId: _restaurantId, tableId: _tableId, status: 'OPEN' });
    return order_collection_1.Orders.find({ accountId: _lAccount._id,                                                  //
        restaurantId: _restaurantId,                                                                                   //
        tableId: _tableId,                                                                                             //
        status: 'ORDER_STATUS.PENDING_CONFIRM',                                                                        //
        'translateInfo.markedToTranslate': true,                                                                       //
        'translateInfo.confirmedToTranslate': false });                                                                //
});                                                                                                                    // 121
/**                                                                                                                    // 123
 * Meteor publications return orders by id                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getOrderById', function (_orderId) {                                                          // 126
    return order_collection_1.Orders.find({ _id: _orderId });                                                          //
});                                                                                                                    // 128
/**                                                                                                                    // 130
 * Meteor publications orders with restaurant Ids and status conditions                                                //
 * @param {string[]} _pRestaurantIds                                                                                   //
 * @param {string[]} _status                                                                                           //
*/                                                                                                                     //
meteor_1.Meteor.publish('getOrdersByRestaurantIds', function (_pRestaurantIds, _status) {                              // 135
    return order_collection_1.Orders.collection.find({ restaurantId: { $in: _pRestaurantIds }, status: { $in: _status } });
});                                                                                                                    // 137
//# sourceMappingURL=order.js.map                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"payment.js":["meteor/meteor","meteor/check","../../../../both/collections/restaurant/payment.collection","../../../../both/collections/auth/user-detail.collection","../../../../both/collections/restaurant/account.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/restaurant/payment.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var check_1 = require("meteor/check");                                                                                 // 2
var payment_collection_1 = require("../../../../both/collections/restaurant/payment.collection");                      // 4
var user_detail_collection_1 = require("../../../../both/collections/auth/user-detail.collection");                    // 5
var account_collection_1 = require("../../../../both/collections/restaurant/account.collection");                      // 8
/**                                                                                                                    // 10
 * Meteor publication payments with userId condition                                                                   //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getUserPayments', function (_userId) {                                                        // 14
    check_1.check(_userId, String);                                                                                    //
    return payment_collection_1.Payments.collection.find({ creation_user: _userId });                                  //
});                                                                                                                    // 17
/**                                                                                                                    // 19
 * Meteor publication payments with userId and restaurant conditions                                                   //
 * @param {string} _userId                                                                                             //
 * @param {string} _restaurantId                                                                                       //
 */                                                                                                                    //
meteor_1.Meteor.publish('getUserPaymentsByRestaurant', function (_userId, _restaurantId) {                             // 24
    check_1.check(_userId, String);                                                                                    //
    check_1.check(_restaurantId, String);                                                                              //
    return payment_collection_1.Payments.collection.find({ creation_user: _userId, restaurantId: _restaurantId });     //
});                                                                                                                    // 28
/**                                                                                                                    // 30
 * Meteor publication payments with userId, restaurantId and tableId conditions                                        //
 * @param {string} _userId                                                                                             //
 * @param {string} _restaurantId                                                                                       //
 * @param {string} _tableId                                                                                            //
 * @param {string[]} _status                                                                                           //
 */                                                                                                                    //
meteor_1.Meteor.publish('getUserPaymentsByRestaurantAndTable', function (_userId, _restaurantId, _tableId, _status) {  // 37
    check_1.check(_userId, String);                                                                                    //
    check_1.check(_restaurantId, String);                                                                              //
    check_1.check(_tableId, String);                                                                                   //
    var _lUserDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                             //
    if (_lUserDetail) {                                                                                                //
        var _lAccount = account_collection_1.Accounts.findOne({ restaurantId: _lUserDetail.current_restaurant,         //
            tableId: _lUserDetail.current_table,                                                                       //
            status: 'OPEN' });                                                                                         //
        return payment_collection_1.Payments.collection.find({ creation_user: _userId, restaurantId: _restaurantId, tableId: _tableId, accountId: _lAccount._id, status: { $in: _status } });
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 50
/**                                                                                                                    // 52
 * Meteor publication payments with resturantId and tableId conditions                                                 //
 * @param {string} _restaurantId                                                                                       //
 * @param {string} _tableId                                                                                            //
 */                                                                                                                    //
meteor_1.Meteor.publish('getPaymentsToWaiter', function (_restaurantId, _tableId) {                                    // 57
    check_1.check(_restaurantId, String);                                                                              //
    check_1.check(_tableId, String);                                                                                   //
    return payment_collection_1.Payments.collection.find({ restaurantId: _restaurantId, tableId: _tableId, status: 'PAYMENT.NO_PAID' });
});                                                                                                                    // 61
/**                                                                                                                    // 63
 * Meteor publication payments with restaurant Ids                                                                     //
 * @param {string[]} _pRestaurantIds                                                                                   //
 */                                                                                                                    //
meteor_1.Meteor.publish('getPaymentsByRestaurantIds', function (_pRestaurantIds) {                                     // 67
    return payment_collection_1.Payments.collection.find({ restaurantId: { $in: _pRestaurantIds }, status: 'PAYMENT.PAID', received: true });
});                                                                                                                    // 69
//# sourceMappingURL=payment.js.map                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"restaurant.js":["meteor/meteor","../../../../both/collections/restaurant/restaurant.collection","../../../../both/collections/auth/user-detail.collection","meteor/check","../../../../both/collections/payment/payment-history.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/restaurant/restaurant.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var restaurant_collection_1 = require("../../../../both/collections/restaurant/restaurant.collection");                // 2
var user_detail_collection_1 = require("../../../../both/collections/auth/user-detail.collection");                    // 3
var check_1 = require("meteor/check");                                                                                 // 4
var payment_history_collection_1 = require("../../../../both/collections/payment/payment-history.collection");         // 7
/**                                                                                                                    // 9
 * Meteor publication restaurants with creation user condition                                                         //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('restaurants', function (_userId) {                                                            // 13
    check_1.check(_userId, String);                                                                                    //
    return restaurant_collection_1.Restaurants.collection.find({ creation_user: _userId });                            //
});                                                                                                                    // 16
/**                                                                                                                    // 18
 * Meteor publication restaurantImages with user Id condition                                                          //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('restaurantImages', function (_userId) {                                                       // 22
    check_1.check(_userId, String);                                                                                    //
    return restaurant_collection_1.RestaurantImages.collection.find({ userId: _userId });                              //
});                                                                                                                    // 25
/**                                                                                                                    // 27
 * Meteor publication restaurantImages with user Id condition                                                          //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('restaurantImagesByRestaurantWork', function (_userId) {                                       // 31
    check_1.check(_userId, String);                                                                                    //
    var user_detail = user_detail_collection_1.UserDetails.collection.findOne({ user_id: _userId });                   //
    if (user_detail) {                                                                                                 //
        return restaurant_collection_1.RestaurantImages.collection.find({ restaurantId: user_detail.restaurant_work });
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 39
/**                                                                                                                    // 41
 * Meteor publications restaurantByCurrentUser                                                                         //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getRestaurantByCurrentUser', function (_userId) {                                             // 46
    check_1.check(_userId, String);                                                                                    //
    var user_detail = user_detail_collection_1.UserDetails.collection.findOne({ user_id: _userId });                   //
    if (user_detail) {                                                                                                 //
        return restaurant_collection_1.Restaurants.collection.find({ _id: user_detail.current_restaurant });           //
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 54
/**                                                                                                                    // 56
 * Meteor publications restaurantByRestaurantWork                                                                      //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getRestaurantByRestaurantWork', function (_userId) {                                          // 61
    check_1.check(_userId, String);                                                                                    //
    var user_detail = user_detail_collection_1.UserDetails.collection.findOne({ user_id: _userId });                   //
    if (user_detail) {                                                                                                 //
        return restaurant_collection_1.Restaurants.collection.find({ _id: user_detail.restaurant_work });              //
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 69
/**                                                                                                                    // 71
 * Meteor publication restaurantImageThumbs with user Id condition                                                     //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('restaurantImageThumbs', function (_userId) {                                                  // 75
    check_1.check(_userId, String);                                                                                    //
    return restaurant_collection_1.RestaurantImageThumbs.collection.find({ userId: _userId });                         //
});                                                                                                                    // 78
/**                                                                                                                    // 80
 * Meteor publication restaurantImageThumbs with restaurant Id condition                                               //
 * @param {string} _restaurantId                                                                                       //
 */                                                                                                                    //
meteor_1.Meteor.publish('restaurantImageThumbsByRestaurantId', function (_restaurantId) {                              // 84
    check_1.check(_restaurantId, String);                                                                              //
    return restaurant_collection_1.RestaurantImageThumbs.collection.find({ restaurantId: _restaurantId });             //
});                                                                                                                    // 87
/**                                                                                                                    // 89
 * Meteor publications getRestaurantImageThumbByRestaurantWork                                                         //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getRestaurantImageThumbByRestaurantWork', function (_userId) {                                // 93
    check_1.check(_userId, String);                                                                                    //
    var user_detail = user_detail_collection_1.UserDetails.collection.findOne({ user_id: _userId });                   //
    if (user_detail) {                                                                                                 //
        return restaurant_collection_1.RestaurantImageThumbs.collection.find({ restaurantId: user_detail.restaurant_work });
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 101
/**                                                                                                                    // 103
 * Meteor publication restaurantImageThumbs with user Id condition                                                     //
 * @param {string} _restaurantId                                                                                       //
 */                                                                                                                    //
meteor_1.Meteor.publish('restaurantImageThumbsByUserId', function (_userId) {                                          // 107
    check_1.check(_userId, String);                                                                                    //
    var _lUserDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                             //
    if (_lUserDetail) {                                                                                                //
        if (_lUserDetail.current_restaurant) {                                                                         //
            return restaurant_collection_1.RestaurantImageThumbs.collection.find({ restaurantId: _lUserDetail.current_restaurant });
        }                                                                                                              //
        else {                                                                                                         //
            return;                                                                                                    //
        }                                                                                                              //
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 119
/**                                                                                                                    // 121
 * Meteor publication to find current restaurants with no pay                                                          //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('currentRestaurantsNoPayed', function (_userId) {                                              // 125
    check_1.check(_userId, String);                                                                                    //
    var currentDate = new Date();                                                                                      //
    var currentMonth = (currentDate.getMonth() + 1).toString();                                                        //
    var currentYear = currentDate.getFullYear().toString();                                                            //
    var historyPaymentRes = [];                                                                                        //
    var restaurantsInitial = [];                                                                                       //
    restaurant_collection_1.Restaurants.collection.find({ creation_user: _userId, isActive: true, freeDays: false }).fetch().forEach(function (restaurant) {
        restaurantsInitial.push(restaurant._id);                                                                       //
    });                                                                                                                //
    payment_history_collection_1.PaymentsHistory.collection.find({                                                     //
        restaurantIds: {                                                                                               //
            $in: restaurantsInitial                                                                                    //
        }, month: currentMonth, year: currentYear, $or: [{ status: 'TRANSACTION_STATUS.APPROVED' }, { status: 'TRANSACTION_STATUS.PENDING' }]
    }).fetch().forEach(function (historyPayment) {                                                                     //
        historyPayment.restaurantIds.forEach(function (restaurantId) {                                                 //
            historyPaymentRes.push(restaurantId);                                                                      //
        });                                                                                                            //
    });                                                                                                                //
    return restaurant_collection_1.Restaurants.collection.find({ _id: { $nin: historyPaymentRes }, creation_user: _userId, isActive: true, freeDays: false });
});                                                                                                                    // 149
/**                                                                                                                    // 151
 * Meteor publication to find inactive restaurants by user                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getInactiveRestaurants', function (_userId) {                                                 // 154
    check_1.check(_userId, String);                                                                                    //
    return restaurant_collection_1.Restaurants.collection.find({ creation_user: _userId, isActive: false });           //
});                                                                                                                    // 157
/**                                                                                                                    // 159
 * Meteor publication return active restaurants by user                                                                //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getActiveRestaurants', function (_userId) {                                                   // 163
    check_1.check(_userId, String);                                                                                    //
    return restaurant_collection_1.Restaurants.collection.find({ creation_user: _userId, isActive: true });            //
});                                                                                                                    // 166
/**                                                                                                                    // 168
 * Meteor publication return restaurants by id                                                                         //
 * @param {string} _pId                                                                                                //
 */                                                                                                                    //
meteor_1.Meteor.publish('getRestaurantById', function (_pId) {                                                         // 172
    check_1.check(_pId, String);                                                                                       //
    return restaurant_collection_1.Restaurants.collection.find({ _id: _pId });                                         //
});                                                                                                                    // 175
//# sourceMappingURL=restaurant.js.map                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"table.js":["meteor/meteor","../../../../both/collections/restaurant/table.collection","../../../../both/collections/auth/user-detail.collection","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/restaurant/table.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var table_collection_1 = require("../../../../both/collections/restaurant/table.collection");                          // 2
var user_detail_collection_1 = require("../../../../both/collections/auth/user-detail.collection");                    // 3
var check_1 = require("meteor/check");                                                                                 // 5
/**                                                                                                                    // 7
 * Meteor publication tables with user creation condition                                                              //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('tables', function (_userId) {                                                                 // 11
    check_1.check(_userId, String);                                                                                    //
    return table_collection_1.Tables.collection.find({ creation_user: _userId });                                      //
});                                                                                                                    // 14
/**                                                                                                                    // 16
 * Meteor publication tables                                                                                           //
 * @param {string} _tableId                                                                                            //
 */                                                                                                                    //
meteor_1.Meteor.publish('getTableById', function (_tableId) {                                                          // 20
    check_1.check(_tableId, String);                                                                                   //
    return table_collection_1.Tables.collection.find({ _id: _tableId });                                               //
});                                                                                                                    // 23
/**                                                                                                                    // 25
 * Meteor publication table by current_table                                                                           //
 */                                                                                                                    //
meteor_1.Meteor.publish('getTableByCurrentTable', function (_userId) {                                                 // 28
    check_1.check(_userId, String);                                                                                    //
    var user_detail = user_detail_collection_1.UserDetails.collection.findOne({ user_id: _userId });                   //
    if (user_detail) {                                                                                                 //
        return table_collection_1.Tables.collection.find({ _id: user_detail.current_table });                          //
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 37
/**                                                                                                                    // 39
 * Meteor publication return all tables                                                                                //
 */                                                                                                                    //
meteor_1.Meteor.publish('getAllTables', function () {                                                                  // 42
    return table_collection_1.Tables.collection.find({});                                                              //
});                                                                                                                    // 44
/**                                                                                                                    // 46
 * Meteor publication return tables with restaurant condition                                                          //
 * @param {string} _restaurantId                                                                                       //
 */                                                                                                                    //
meteor_1.Meteor.publish('getTablesByRestaurant', function (_restaurantId) {                                            // 50
    check_1.check(_restaurantId, String);                                                                              //
    return table_collection_1.Tables.collection.find({ restaurantId: _restaurantId });                                 //
});                                                                                                                    // 53
/**                                                                                                                    // 55
 * Meteor publication return tables by restaurant Work                                                                 //
 * @param {string} _userId                                                                                             //
 */                                                                                                                    //
meteor_1.Meteor.publish('getTablesByRestaurantWork', function (_userId) {                                              // 59
    check_1.check(_userId, String);                                                                                    //
    var _lUserDetail = user_detail_collection_1.UserDetails.findOne({ user_id: _userId });                             //
    if (_lUserDetail) {                                                                                                //
        return table_collection_1.Tables.collection.find({ restaurantId: _lUserDetail.restaurant_work });              //
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 67
//# sourceMappingURL=table.js.map                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"waiter-call.js":["meteor/meteor","../../../../both/collections/restaurant/waiter-call-detail.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/restaurant/waiter-call.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var waiter_call_detail_collection_1 = require("../../../../both/collections/restaurant/waiter-call-detail.collection");
/**                                                                                                                    // 4
 * Meteor publication waiter call details. userId                                                                      //
 * @param { string } _userId                                                                                           //
 */                                                                                                                    //
meteor_1.Meteor.publish('countWaiterCallDetailByUsrId', function (_userId) {                                           // 8
    return waiter_call_detail_collection_1.WaiterCallDetails.collection.find({ user_id: _userId, status: { $in: ["waiting", "completed"] } });
});                                                                                                                    // 10
/**                                                                                                                    // 12
 * Meteor publication waiter call details, for to payment.                                                             //
 * @param { string } _restaurantId                                                                                     //
 * @param { string } _tableId                                                                                          //
 * @param { string } _type                                                                                             //
 * @param { string[] } _status                                                                                         //
 */                                                                                                                    //
meteor_1.Meteor.publish('WaiterCallDetailForPayment', function (_restaurantId, _tableId, _type) {                      // 19
    return waiter_call_detail_collection_1.WaiterCallDetails.collection.find({ restaurant_id: _restaurantId,           //
        table_id: _tableId,                                                                                            //
        type: _type,                                                                                                   //
        status: { $in: ['waiting', 'completed'] } });                                                                  //
});                                                                                                                    // 26
/**                                                                                                                    // 28
 * Meteor publication waiter call details. userId (Waiter id)                                                          //
 * @param { string } _waiterId                                                                                         //
 */                                                                                                                    //
meteor_1.Meteor.publish('waiterCallDetailByWaiterId', function (_waiterId) {                                           // 32
    return waiter_call_detail_collection_1.WaiterCallDetails.collection.find({ waiter_id: _waiterId, status: "completed" });
});                                                                                                                    // 34
//# sourceMappingURL=waiter-call.js.map                                                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"settings":{"cities.js":["meteor/meteor","../../../../both/collections/settings/city.collection","../../../../both/collections/restaurant/restaurant.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/settings/cities.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var city_collection_1 = require("../../../../both/collections/settings/city.collection");                              // 2
var restaurant_collection_1 = require("../../../../both/collections/restaurant/restaurant.collection");                // 3
/**                                                                                                                    // 5
 * Meteor publication cities                                                                                           //
 */                                                                                                                    //
meteor_1.Meteor.publish('cities', function () { return city_collection_1.Cities.find({ is_active: true }); });         // 8
/**                                                                                                                    // 10
 * City by restaurant                                                                                                  //
 */                                                                                                                    //
meteor_1.Meteor.publish('getCityByRestaurantId', function (_restaurantId) {                                            // 13
    check(_restaurantId, String);                                                                                      //
    var restaurant = restaurant_collection_1.Restaurants.collection.findOne({ _id: _restaurantId });                   //
    if (restaurant) {                                                                                                  //
        return city_collection_1.Cities.collection.find({ _id: restaurant.cityId });                                   //
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 21
/**                                                                                                                    // 24
 * Meteor publications cities by country                                                                               //
 */                                                                                                                    //
meteor_1.Meteor.publish('citiesByCountry', function (_countryId) {                                                     // 27
    check(_countryId, String);                                                                                         //
    return city_collection_1.Cities.collection.find({ country: _countryId, is_active: true });                         //
});                                                                                                                    // 30
//# sourceMappingURL=cities.js.map                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"countries.js":["meteor/meteor","../../../../both/collections/settings/country.collection","../../../../both/collections/restaurant/restaurant.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/settings/countries.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var country_collection_1 = require("../../../../both/collections/settings/country.collection");                        // 2
var restaurant_collection_1 = require("../../../../both/collections/restaurant/restaurant.collection");                // 3
/**                                                                                                                    // 6
 * Meteor publication countries                                                                                        //
 */                                                                                                                    //
meteor_1.Meteor.publish('countries', function () {                                                                     // 9
    return country_collection_1.Countries.collection.find({ is_active: true });                                        //
});                                                                                                                    // 11
/**                                                                                                                    // 14
 * Country by restaurant                                                                                               //
 */                                                                                                                    //
meteor_1.Meteor.publish('getCountryByRestaurantId', function (_restaurantId) {                                         // 17
    check(_restaurantId, String);                                                                                      //
    var restaurant = restaurant_collection_1.Restaurants.collection.findOne({ _id: _restaurantId });                   //
    if (restaurant) {                                                                                                  //
        return country_collection_1.Countries.collection.find({ _id: restaurant.countryId });                          //
    }                                                                                                                  //
    else {                                                                                                             //
        return;                                                                                                        //
    }                                                                                                                  //
});                                                                                                                    // 25
/**                                                                                                                    // 27
 * Meteor publication return countries by restaurants Id                                                               //
 */                                                                                                                    //
meteor_1.Meteor.publish('getCountriesByRestaurantsId', function (_restaurantsId) {                                     // 30
    var _ids = [];                                                                                                     //
    restaurant_collection_1.Restaurants.collection.find({ _id: { $in: _restaurantsId } }).forEach(function (restaurant) {
        _ids.push(restaurant.countryId);                                                                               //
    });                                                                                                                //
    return country_collection_1.Countries.collection.find({ _id: { $in: _ids } });                                     //
});                                                                                                                    // 36
/**                                                                                                                    // 39
 * Meteor publicaation return countries by admin user Id                                                               //
 */                                                                                                                    //
meteor_1.Meteor.publish('getCountriesByAdminUser', function () {                                                       // 42
    var _countriesIds = [];                                                                                            //
    restaurant_collection_1.Restaurants.collection.find({ creation_user: this.userId }).forEach(function (restaurant) {
        _countriesIds.push(restaurant.countryId);                                                                      //
    });                                                                                                                //
    return country_collection_1.Countries.collection.find({ _id: { $in: _countriesIds }, is_active: true });           //
});                                                                                                                    // 49
//# sourceMappingURL=countries.js.map                                                                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"languages.js":["meteor/meteor","../../../../both/collections/settings/language.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/publications/settings/languages.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var meteor_1 = require("meteor/meteor");                                                                               // 1
var language_collection_1 = require("../../../../both/collections/settings/language.collection");                      // 2
/**                                                                                                                    // 4
 * Meteor publication languages                                                                                        //
 */                                                                                                                    //
meteor_1.Meteor.publish('languages', function () { return language_collection_1.Languages.find({ is_active: true }); });
//# sourceMappingURL=languages.js.map                                                                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"indexes":{"indexdb.js":["../../../both/collections/restaurant/restaurant.collection","../../../both/collections/auth/user-detail.collection","../../../both/collections/administration/section.collection","../../../both/collections/administration/category.collection","../../../both/collections/administration/subcategory.collection","../../../both/collections/administration/addition.collection","../../../both/collections/administration/item.collection","../../../both/collections/administration/garnish-food.collection","../../../both/collections/general/paymentMethod.collection","../../../both/collections/payment/payment-history.collection","../../../both/collections/restaurant/account.collection","../../../both/collections/restaurant/order.collection","../../../both/collections/restaurant/table.collection","../../../both/collections/restaurant/payment.collection","../../../both/collections/restaurant/waiter-call-detail.collection","../../../both/collections/payment/cc-payment-methods.collection","../../../both/collections/payment/payment-transaction.collection","../../../both/collections/restaurant/invoice.collection","../../../both/collections/settings/city.collection","../../../both/collections/settings/country.collection","../../../both/collections/settings/language.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/imports/indexes/indexdb.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var restaurant_collection_1 = require("../../../both/collections/restaurant/restaurant.collection");                   // 1
var user_detail_collection_1 = require("../../../both/collections/auth/user-detail.collection");                       // 2
var section_collection_1 = require("../../../both/collections/administration/section.collection");                     // 3
var category_collection_1 = require("../../../both/collections/administration/category.collection");                   // 4
var subcategory_collection_1 = require("../../../both/collections/administration/subcategory.collection");             // 5
var addition_collection_1 = require("../../../both/collections/administration/addition.collection");                   // 6
var item_collection_1 = require("../../../both/collections/administration/item.collection");                           // 7
var garnish_food_collection_1 = require("../../../both/collections/administration/garnish-food.collection");           // 8
var paymentMethod_collection_1 = require("../../../both/collections/general/paymentMethod.collection");                // 9
var payment_history_collection_1 = require("../../../both/collections/payment/payment-history.collection");            // 10
var account_collection_1 = require("../../../both/collections/restaurant/account.collection");                         // 11
var order_collection_1 = require("../../../both/collections/restaurant/order.collection");                             // 12
var table_collection_1 = require("../../../both/collections/restaurant/table.collection");                             // 13
var payment_collection_1 = require("../../../both/collections/restaurant/payment.collection");                         // 14
var waiter_call_detail_collection_1 = require("../../../both/collections/restaurant/waiter-call-detail.collection");   // 15
var cc_payment_methods_collection_1 = require("../../../both/collections/payment/cc-payment-methods.collection");      // 16
var payment_transaction_collection_1 = require("../../../both/collections/payment/payment-transaction.collection");    // 17
var invoice_collection_1 = require("../../../both/collections/restaurant/invoice.collection");                         // 18
var city_collection_1 = require("../../../both/collections/settings/city.collection");                                 // 19
var country_collection_1 = require("../../../both/collections/settings/country.collection");                           // 20
var language_collection_1 = require("../../../both/collections/settings/language.collection");                         // 21
function createdbindexes() {                                                                                           // 23
    // Restaurant Collection Indexes                                                                                   //
    restaurant_collection_1.Restaurants.collection._ensureIndex({ creation_user: 1 });                                 //
    restaurant_collection_1.Restaurants.collection._ensureIndex({ name: 1 });                                          //
    restaurant_collection_1.Restaurants.collection._ensureIndex({ isActive: 1 });                                      //
    // Restaurant Image Collection Indexes                                                                             //
    restaurant_collection_1.RestaurantImages.collection._ensureIndex({ userId: 1 });                                   //
    restaurant_collection_1.RestaurantImages.collection._ensureIndex({ restaurantId: 1 });                             //
    // Restaurant Image Thumb Collection Indexes                                                                       //
    restaurant_collection_1.RestaurantImageThumbs.collection._ensureIndex({ userId: 1 });                              //
    restaurant_collection_1.RestaurantImageThumbs.collection._ensureIndex({ restaurantId: 1 });                        //
    // User Collections Indexes                                                                                        //
    user_detail_collection_1.UserDetails.collection._ensureIndex({ user_id: 1 });                                      //
    user_detail_collection_1.UserDetails.collection._ensureIndex({ restaurant_work: 1 });                              //
    user_detail_collection_1.UserDetails.collection._ensureIndex({ current_restaurant: 1, current_table: 1 });         //
    // Section Collection Indexes                                                                                      //
    section_collection_1.Sections.collection._ensureIndex({ creation_user: 1 });                                       //
    section_collection_1.Sections.collection._ensureIndex({ restaurants: 1 });                                         //
    // Category Collection Indexes                                                                                     //
    category_collection_1.Categories.collection._ensureIndex({ creation_user: 1 });                                    //
    category_collection_1.Categories.collection._ensureIndex({ section: 1 });                                          //
    // Subcategory Collection Indexes                                                                                  //
    subcategory_collection_1.Subcategories.collection._ensureIndex({ creation_user: 1 });                              //
    subcategory_collection_1.Subcategories.collection._ensureIndex({ category: 1 });                                   //
    // Addition Collection Indexes                                                                                     //
    addition_collection_1.Additions.collection._ensureIndex({ creation_user: 1 });                                     //
    addition_collection_1.Additions.collection._ensureIndex({ restaurants: 1 });                                       //
    // Item Collection Indexes                                                                                         //
    item_collection_1.Items.collection._ensureIndex({ additionsIsAccepted: 1 });                                       //
    item_collection_1.Items.collection._ensureIndex({ garnishFoodIsAcceped: 1 });                                      //
    item_collection_1.Items.collection._ensureIndex({ creation_user: 1 });                                             //
    item_collection_1.Items.collection._ensureIndex({ sectionId: 1 });                                                 //
    item_collection_1.Items.collection._ensureIndex({ restaurants: 1 });                                               //
    // GarnishFood Collection Indexes                                                                                  //
    garnish_food_collection_1.GarnishFoodCol.collection._ensureIndex({ creation_user: 1 });                            //
    garnish_food_collection_1.GarnishFoodCol.collection._ensureIndex({ restaurants: 1 });                              //
    // Item Images Collection Indexes                                                                                  //
    item_collection_1.ItemImages.collection._ensureIndex({ userId: 1 });                                               //
    item_collection_1.ItemImages.collection._ensureIndex({ itemId: 1 });                                               //
    // Item Image Thumbs Collection Indexes                                                                            //
    item_collection_1.ItemImagesThumbs.collection._ensureIndex({ userId: 1 });                                         //
    item_collection_1.ItemImagesThumbs.collection._ensureIndex({ itemId: 1 });                                         //
    // PaymentMethod Collection Indexes                                                                                //
    paymentMethod_collection_1.PaymentMethods.collection._ensureIndex({ isActive: 1 });                                //
    // PaymentsHistory Collection Indexes                                                                              //
    payment_history_collection_1.PaymentsHistory.collection._ensureIndex({ restaurantIds: 1 });                        //
    payment_history_collection_1.PaymentsHistory.collection._ensureIndex({ creation_user: 1 });                        //
    payment_history_collection_1.PaymentsHistory.collection._ensureIndex({ creation_date: 1 });                        //
    // Accounts Collection Indexes                                                                                     //
    account_collection_1.Accounts.collection._ensureIndex({ restaurantId: 1 });                                        //
    account_collection_1.Accounts.collection._ensureIndex({ status: 1 });                                              //
    account_collection_1.Accounts.collection._ensureIndex({ tableId: 1 });                                             //
    // Tables Collection Indexes                                                                                       //
    table_collection_1.Tables.collection._ensureIndex({ QR_code: 1 });                                                 //
    table_collection_1.Tables.collection._ensureIndex({ restaurantId: 1 });                                            //
    // Orders Collection Indexes                                                                                       //
    order_collection_1.Orders.collection._ensureIndex({ restaurantId: 1 });                                            //
    order_collection_1.Orders.collection._ensureIndex({ tableId: 1 });                                                 //
    order_collection_1.Orders.collection._ensureIndex({ status: 1 });                                                  //
    order_collection_1.Orders.collection._ensureIndex({ accountId: 1 });                                               //
    // Payments Collection Indexes                                                                                     //
    payment_collection_1.Payments.collection._ensureIndex({ creation_user: 1 });                                       //
    payment_collection_1.Payments.collection._ensureIndex({ restaurantId: 1, tableId: 1, status: 1 });                 //
    // WaiterCallDetails Collection Indexes                                                                            //
    waiter_call_detail_collection_1.WaiterCallDetails.collection._ensureIndex({ status: 1 });                          //
    waiter_call_detail_collection_1.WaiterCallDetails.collection._ensureIndex({ user_id: 1 });                         //
    waiter_call_detail_collection_1.WaiterCallDetails.collection._ensureIndex({ restaurant_id: 1, table_id: 1, type: 1 });
    // CcPaymentMethods Collection Indexes                                                                             //
    cc_payment_methods_collection_1.CcPaymentMethods.collection._ensureIndex({ is_active: 1 });                        //
    // PaymentTransactions Collection Indexes                                                                          //
    payment_transaction_collection_1.PaymentTransactions.collection._ensureIndex({ creation_user: 1 });                //
    // Invoices Collection Indexes                                                                                     //
    invoice_collection_1.Invoices.collection._ensureIndex({ customer_id: 1 });                                         //
    // Cities Collection Indexes                                                                                       //
    city_collection_1.Cities.collection._ensureIndex({ country: 1 });                                                  //
    city_collection_1.Cities.collection._ensureIndex({ is_active: 1 });                                                //
    // Countries Collection Indexes                                                                                    //
    country_collection_1.Countries.collection._ensureIndex({ is_active: 1 });                                          //
    // Languages Collection Indexes                                                                                    //
    language_collection_1.Languages.collection._ensureIndex({ is_active: 1 });                                         //
}                                                                                                                      // 128
exports.createdbindexes = createdbindexes;                                                                             // 23
//# sourceMappingURL=indexdb.js.map                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"cron-config.js":["meteor/percolate:synced-cron",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/cron-config.js                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var percolate_synced_cron_1 = require("meteor/percolate:synced-cron");                                                 // 1
percolate_synced_cron_1.SyncedCron.config({                                                                            // 2
    // Log job run details to console                                                                                  //
    log: true,                                                                                                         //
    // Use a custom logger function (defaults to Meteor's logging package)                                             //
    logger: null,                                                                                                      //
    // Name of collection to use for synchronisation and logging                                                       //
    collectionName: 'cron_history',                                                                                    //
    // Default to using localTime                                                                                      //
    utc: false,                                                                                                        //
    /*                                                                                                                 //
      TTL in seconds for history records in collection to expire                                                       //
      NOTE: Unset to remove expiry but ensure you remove the index from                                                //
      mongo by hand                                                                                                    //
                                                                                                                       //
      ALSO: SyncedCron can't use the `_ensureIndex` command to modify                                                  //
      the TTL index. The best way to modify the default value of                                                       //
      `collectionTTL` is to remove the index by hand (in the mongo shell                                               //
      run `db.cronHistory.dropIndex({startedAt: 1})`) and re-run your                                                  //
      project. SyncedCron will recreate the index with the updated TTL.                                                //
    */                                                                                                                 //
    collectionTTL: 172800                                                                                              //
});                                                                                                                    //
//# sourceMappingURL=cron-config.js.map                                                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"cron.js":["meteor/percolate:synced-cron","../both/collections/settings/country.collection",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/cron.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
var percolate_synced_cron_1 = require("meteor/percolate:synced-cron");                                                 // 1
var country_collection_1 = require("../both/collections/settings/country.collection");                                 // 2
function createCrons() {                                                                                               // 5
    var activeCountries = country_collection_1.Countries.collection.find({ is_active: true }).fetch();                 //
    activeCountries.forEach(function (country) {                                                                       //
        /**                                                                                                            //
        * This cron evaluates the freeDays flag on restaurants with value true, and change it to false                 //
        */                                                                                                             //
        percolate_synced_cron_1.SyncedCron.add({                                                                       //
            name: 'cronChangeFreeDays.' + country.name,                                                                //
            schedule: function (parser) {                                                                              //
                return parser.cron(country.cronChangeFreeDays);                                                        //
            },                                                                                                         //
            job: function () {                                                                                         //
                Meteor.call('changeFreeDaysToFalse', country._id);                                                     //
            }                                                                                                          //
        });                                                                                                            //
        /**                                                                                                            //
        * This cron sends email to warn the charge soon of iurest service                                              //
        */                                                                                                             //
        percolate_synced_cron_1.SyncedCron.add({                                                                       //
            name: 'cronEmailChargeSoon.' + country.name,                                                               //
            schedule: function (parser) {                                                                              //
                return parser.cron(country.cronEmailChargeSoon);                                                       //
            },                                                                                                         //
            job: function () {                                                                                         //
                Meteor.call('sendEmailChargeSoon', country._id);                                                       //
            }                                                                                                          //
        });                                                                                                            //
        /**                                                                                                            //
        * This cron sends email to warn the expire soon the iurest service                                             //
        */                                                                                                             //
        percolate_synced_cron_1.SyncedCron.add({                                                                       //
            name: 'cronEmailExpireSoon.' + country.name,                                                               //
            schedule: function (parser) {                                                                              //
                return parser.cron(country.cronEmailExpireSoon);                                                       //
            },                                                                                                         //
            job: function () {                                                                                         //
                Meteor.call('sendEmailExpireSoon', country._id);                                                       //
            }                                                                                                          //
        });                                                                                                            //
        /**                                                                                                            //
         * This cron evaluates the isActive flag on restaurants with value true, and insert them on history_payment collection
         */                                                                                                            //
        percolate_synced_cron_1.SyncedCron.add({                                                                       //
            name: 'cronValidateActive.' + country.name,                                                                //
            schedule: function (parser) {                                                                              //
                return parser.cron(country.cronValidateActive);                                                        //
            },                                                                                                         //
            job: function () {                                                                                         //
                Meteor.call('validateActiveRestaurants', country._id);                                                 //
            }                                                                                                          //
        });                                                                                                            //
        /**                                                                                                            //
        * This cron sends an email to warn that the service has expired                                                //
        */                                                                                                             //
        percolate_synced_cron_1.SyncedCron.add({                                                                       //
            name: 'cronEmailRestExpired.' + country.name,                                                              //
            schedule: function (parser) {                                                                              //
                return parser.cron(country.cronEmailRestExpired);                                                      //
            },                                                                                                         //
            job: function () {                                                                                         //
                Meteor.call('sendEmailRestExpired', country._id);                                                      //
            }                                                                                                          //
        });                                                                                                            //
    });                                                                                                                //
}                                                                                                                      // 70
exports.createCrons = createCrons;                                                                                     // 5
percolate_synced_cron_1.SyncedCron.start();                                                                            // 72
//# sourceMappingURL=cron.js.map                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"social-config.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/social-config.js                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*ServiceConfiguration.configurations.remove({                                                                         // 1
    service: 'facebook'                                                                                                //
});                                                                                                                    //
                                                                                                                       //
ServiceConfiguration.configurations.insert({                                                                           //
    service: 'facebook',                                                                                               //
    appId: '1743125776004465',                                                                                         //
    secret: 'be71d1908bb31c04e3435b047e011b42'                                                                         //
});                                                                                                                    //
*/ServiceConfiguration.configurations.remove({                                                                         //
    service: 'twitter'                                                                                                 // 12
});                                                                                                                    // 11
ServiceConfiguration.configurations.insert({                                                                           // 15
    service: 'twitter',                                                                                                // 16
    consumerKey: 'XZuoLj972idwgDXiT0KIgiAWl',                                                                          // 17
    secret: 'OaaALjkC9uJhFQRFpK5emhUYJiqHw27TYny7cfSzNd4paEvE5S'                                                       // 18
});                                                                                                                    // 15
ServiceConfiguration.configurations.remove({                                                                           // 21
    service: 'google'                                                                                                  // 22
});                                                                                                                    // 21
ServiceConfiguration.configurations.insert({                                                                           // 25
    service: 'google',                                                                                                 // 26
    clientId: '665007448748-0pk8688jqp2874f81ev1q78efalfb2lu.apps.googleusercontent.com',                              // 27
    secret: 'E0RV1a7mQvBtXgjqFoSrzV8L'                                                                                 // 28
});                                                                                                                    // 25
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":["/server/imports/publications/administration/sections","meteor/meteor","/server/imports/fixtures/auth/account-creation","/server/imports/publications/administration/categories","/server/imports/publications/administration/subcategories","/server/imports/publications/administration/additions","/server/imports/publications/administration/promotions","/server/imports/publications/administration/garnish-food","/server/imports/publications/auth/users","/server/imports/publications/auth/roles","/server/imports/publications/auth/menus","/server/imports/publications/restaurant/restaurant","/server/imports/publications/general/hour","/server/imports/publications/general/currency","../both/methods/restaurant/restaurant.methods","/server/imports/publications/general/paymentMethod","../both/methods/auth/menu.methods","../both/methods/auth/user-detail.methods","../both/methods/restaurant/waiter-queue/waiter-queue.methods","/server/imports/publications/settings/cities","/server/imports/publications/settings/countries","/server/imports/publications/settings/languages","../both/methods/administration/promotion.methods","/server/imports/publications/restaurant/table","/server/imports/publications/administration/item","/server/imports/fixtures/auth/email-config","/server/imports/publications/auth/collaborators","/server/imports/publications/auth/user-details","/server/imports/publications/restaurant/account","/server/imports/publications/restaurant/order","/server/imports/publications/restaurant/waiter-call","/server/imports/publications/general/email-content","/server/imports/publications/general/parameter","/server/imports/publications/restaurant/payment","/server/imports/publications/payment/payment-history","/server/imports/publications/payment/cc-payment-method","/server/imports/publications/payment/payment-transaction","/server/imports/publications/restaurant/invoice","/server/imports/fixtures/auth/roles","/server/imports/fixtures/auth/menus","/server/imports/fixtures/general/hours","/server/imports/fixtures/general/currencies","/server/imports/fixtures/general/paymentMethods","/server/imports/fixtures/settings/countries","/server/imports/fixtures/settings/cities","/server/imports/fixtures/settings/languages","/server/imports/fixtures/general/email-contents","/server/imports/fixtures/general/parameters","/server/imports/fixtures/payments/cc-payment-methods","/server/imports/indexes/indexdb","/server/cron",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/main.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Object.defineProperty(exports, "__esModule", { value: true });                                                         //
require("/server/imports/publications/administration/sections");                                                       // 1
var meteor_1 = require("meteor/meteor");                                                                               // 2
require("/server/imports/fixtures/auth/account-creation");                                                             // 3
require("/server/imports/publications/administration/categories");                                                     // 4
require("/server/imports/publications/administration/subcategories");                                                  // 5
require("/server/imports/publications/administration/additions");                                                      // 6
require("/server/imports/publications/administration/promotions");                                                     // 7
require("/server/imports/publications/administration/garnish-food");                                                   // 8
require("/server/imports/publications/auth/users");                                                                    // 9
require("/server/imports/publications/auth/roles");                                                                    // 10
require("/server/imports/publications/auth/menus");                                                                    // 11
require("/server/imports/publications/restaurant/restaurant");                                                         // 12
require("/server/imports/publications/general/hour");                                                                  // 13
require("/server/imports/publications/general/currency");                                                              // 14
require("../both/methods/restaurant/restaurant.methods");                                                              // 15
require("/server/imports/publications/general/paymentMethod");                                                         // 16
require("../both/methods/auth/menu.methods");                                                                          // 17
require("../both/methods/auth/user-detail.methods");                                                                   // 18
require("../both/methods/restaurant/waiter-queue/waiter-queue.methods");                                               // 19
require("/server/imports/publications/settings/cities");                                                               // 20
require("/server/imports/publications/settings/countries");                                                            // 21
require("/server/imports/publications/settings/languages");                                                            // 22
require("../both/methods/administration/promotion.methods");                                                           // 23
require("/server/imports/publications/restaurant/table");                                                              // 24
require("/server/imports/publications/administration/item");                                                           // 25
require("/server/imports/fixtures/auth/email-config");                                                                 // 26
require("/server/imports/publications/auth/collaborators");                                                            // 27
require("/server/imports/publications/auth/user-details");                                                             // 28
require("/server/imports/publications/restaurant/account");                                                            // 29
require("/server/imports/publications/restaurant/order");                                                              // 30
require("/server/imports/publications/restaurant/waiter-call");                                                        // 31
require("/server/imports/publications/general/email-content");                                                         // 32
require("/server/imports/publications/general/parameter");                                                             // 33
require("/server/imports/publications/restaurant/payment");                                                            // 34
require("/server/imports/publications/payment/payment-history");                                                       // 35
require("/server/imports/publications/payment/cc-payment-method");                                                     // 36
require("/server/imports/publications/payment/payment-transaction");                                                   // 37
require("/server/imports/publications/restaurant/invoice");                                                            // 38
var roles_1 = require("/server/imports/fixtures/auth/roles");                                                          // 40
var menus_1 = require("/server/imports/fixtures/auth/menus");                                                          // 41
var hours_1 = require("/server/imports/fixtures/general/hours");                                                       // 42
var currencies_1 = require("/server/imports/fixtures/general/currencies");                                             // 43
var paymentMethods_1 = require("/server/imports/fixtures/general/paymentMethods");                                     // 44
var countries_1 = require("/server/imports/fixtures/settings/countries");                                              // 45
var cities_1 = require("/server/imports/fixtures/settings/cities");                                                    // 46
var languages_1 = require("/server/imports/fixtures/settings/languages");                                              // 47
var email_contents_1 = require("/server/imports/fixtures/general/email-contents");                                     // 48
var parameters_1 = require("/server/imports/fixtures/general/parameters");                                             // 49
var cc_payment_methods_1 = require("/server/imports/fixtures/payments/cc-payment-methods");                            // 50
var indexdb_1 = require("/server/imports/indexes/indexdb");                                                            // 51
var cron_1 = require("/server/cron");                                                                                  // 52
meteor_1.Meteor.startup(function () {                                                                                  // 54
    menus_1.loadMenus();                                                                                               //
    roles_1.loadRoles();                                                                                               //
    hours_1.loadHours();                                                                                               //
    currencies_1.loadCurrencies();                                                                                     //
    paymentMethods_1.loadPaymentMethods();                                                                             //
    countries_1.loadCountries();                                                                                       //
    cities_1.loadCities();                                                                                             //
    languages_1.loadLanguages();                                                                                       //
    indexdb_1.createdbindexes();                                                                                       //
    email_contents_1.loadEmailContents();                                                                              //
    parameters_1.loadParameters();                                                                                     //
    cc_payment_methods_1.loadCcPaymentMethods();                                                                       //
    cron_1.createCrons();                                                                                              //
});                                                                                                                    // 68
//# sourceMappingURL=main.js.map                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json",".ttf",".woff",".html",".ts",".less",".scss",".woff2"]});
require("./both/methods/restaurant/QR/codeGenerator.js");
require("./both/methods/restaurant/waiter-queue/queues.methods.js");
require("./both/methods/restaurant/waiter-queue/waiter-queue.methods.js");
require("./both/shared-components/auth/recover-password/recover.class.js");
require("./both/shared-components/restaurant/financial-info/financial-base.js");
require("./both/shared-components/restaurant/financial-info/financial-checkbox.js");
require("./both/shared-components/restaurant/financial-info/financial-dropdown.js");
require("./both/shared-components/restaurant/financial-info/financial-slider.js");
require("./both/shared-components/restaurant/financial-info/financial-text.js");
require("./both/shared-components/restaurant/financial-info/financial-textbox.js");
require("./both/collections/administration/addition.collection.js");
require("./both/collections/administration/category.collection.js");
require("./both/collections/administration/garnish-food.collection.js");
require("./both/collections/administration/item.collection.js");
require("./both/collections/administration/promotion.collection.js");
require("./both/collections/administration/section.collection.js");
require("./both/collections/administration/subcategory.collection.js");
require("./both/collections/auth/device.collection.js");
require("./both/collections/auth/menu.collection.js");
require("./both/collections/auth/role.collection.js");
require("./both/collections/auth/user-detail.collection.js");
require("./both/collections/auth/user.collection.js");
require("./both/collections/general/currency.collection.js");
require("./both/collections/general/email-content.collection.js");
require("./both/collections/general/hours.collection.js");
require("./both/collections/general/parameter.collection.js");
require("./both/collections/general/paymentMethod.collection.js");
require("./both/collections/general/queue.collection.js");
require("./both/collections/payment/cc-payment-methods.collection.js");
require("./both/collections/payment/payment-history.collection.js");
require("./both/collections/payment/payment-transaction.collection.js");
require("./both/collections/restaurant/account.collection.js");
require("./both/collections/restaurant/invoice.collection.js");
require("./both/collections/restaurant/order.collection.js");
require("./both/collections/restaurant/payment.collection.js");
require("./both/collections/restaurant/restaurant.collection.js");
require("./both/collections/restaurant/table.collection.js");
require("./both/collections/restaurant/waiter-call-detail.collection.js");
require("./both/collections/settings/city.collection.js");
require("./both/collections/settings/country.collection.js");
require("./both/collections/settings/language.collection.js");
require("./both/methods/administration/collaborators.methods.js");
require("./both/methods/administration/item.methods.js");
require("./both/methods/administration/promotion.methods.js");
require("./both/methods/auth/menu.methods.js");
require("./both/methods/auth/user-detail.methods.js");
require("./both/methods/auth/user-devices.methods.js");
require("./both/methods/auth/user-profile.methods.js");
require("./both/methods/general/cron.methods.js");
require("./both/methods/general/email.methods.js");
require("./both/methods/general/parameter.methods.js");
require("./both/methods/restaurant/invoice.methods.js");
require("./both/methods/restaurant/order.methods.js");
require("./both/methods/restaurant/payment.methods.js");
require("./both/methods/restaurant/restaurant.methods.js");
require("./both/methods/restaurant/schedule.methods.js");
require("./both/methods/restaurant/table.method.js");
require("./both/methods/settings/change-email.methods.js");
require("./both/methods/settings/country.methods.js");
require("./both/methods/utils/push-notifications.methods.js");
require("./both/models/administration/addition.model.js");
require("./both/models/administration/category.model.js");
require("./both/models/administration/garnish-food.model.js");
require("./both/models/administration/item.model.js");
require("./both/models/administration/menu.model.js");
require("./both/models/administration/promotion.model.js");
require("./both/models/administration/section.model.js");
require("./both/models/administration/subcategory.model.js");
require("./both/models/auth/device.model.js");
require("./both/models/auth/menu.model.js");
require("./both/models/auth/role.model.js");
require("./both/models/auth/user-detail.model.js");
require("./both/models/auth/user-profile.model.js");
require("./both/models/auth/user.model.js");
require("./both/models/general/currency.model.js");
require("./both/models/general/email-content.model.js");
require("./both/models/general/hour.model.js");
require("./both/models/general/parameter.model.js");
require("./both/models/general/paymentMethod.model.js");
require("./both/models/general/queue.model.js");
require("./both/models/payment/cc-payment-method.model.js");
require("./both/models/payment/cc-request-colombia.model.js");
require("./both/models/payment/payment-history.model.js");
require("./both/models/payment/payment-transaction.model.js");
require("./both/models/payment/response-query.model.js");
require("./both/models/restaurant/account.model.js");
require("./both/models/restaurant/invoice.model.js");
require("./both/models/restaurant/node.js");
require("./both/models/restaurant/order.model.js");
require("./both/models/restaurant/payment.model.js");
require("./both/models/restaurant/restaurant.model.js");
require("./both/models/restaurant/table.model.js");
require("./both/models/restaurant/waiter-call-detail.model.js");
require("./both/models/settings/city.model.js");
require("./both/models/settings/country.model.js");
require("./both/models/settings/language.model.js");
require("./both/shared-components/auth/reset-password.class.js");
require("./both/shared-components/validators/custom-validator.js");
require("./both/stores/administration/item.store.js");
require("./both/stores/administration/promotion.store.js");
require("./both/stores/auth/user.store.js");
require("./both/stores/restaurant/restaurant.store.js");
require("./both/models/collection-object.model.js");
require("./server/cron-config.js");
require("./server/cron.js");
require("./server/social-config.js");
require("./server/main.js");
//# sourceMappingURL=app.js.map
