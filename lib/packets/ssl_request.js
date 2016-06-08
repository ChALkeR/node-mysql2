// http://dev.mysql.com/doc/internals/en/connection-phase-packets.html#packet-Protocol::SSLRequest

var ClientConstants = require('../constants/client');
var Packet = require('../packets/packet');
var Charsets = require('../constants/charsets');

function SSLRequest (flags, charset)
{
  this.clientFlags = flags | ClientConstants.SSL;
  this.charset = charset;
}

SSLRequest.prototype.toPacket = function ()
{
  var length = 36;
  var buffer = new Buffer(length);
  var packet = new Packet(0, buffer, 0, length);
  buffer.fill(0);
  packet.offset = 4;

  packet.writeInt32(this.clientFlags);
  packet.writeInt32(0); // max packet size. todo: move to config
  packet.writeInt8(charset);
  return packet;
};

module.exports = SSLRequest;
