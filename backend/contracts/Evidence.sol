// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
pragma experimental ABIEncoderV2;
contract Evidence
{

struct Case
{
string  caseName;
string  caseNumber;
string  caseReason;
string investorID;

}
mapping(string  => Case[]) public Cases;
string [] cases;

struct Item
{
// string caseid;
// string evidtype;
// string modelno;
// string serial;
// string contentOwner;
// string contentDescription;
// string ownerContact;
string[] data;
string agent;
string method;
string hashing;
string Time;
string gentInfo;
string pid;
uint itemNo;
string hashofhash;

}

mapping(string  => Item[]) public Items;
string [] items; 

uint public t=0;

 constructor()  {
   createCase("t1", "t2" ,"a@a.in");
   createCase("p1", "p2" ,"a@a.in");
    string[] memory newArray = new string[](7);
  // createEvid("a@a.in:CASE:1", "a@a.in", "pendrive" , "abc123", "123");
  //createEvid("a@a.in:CASE:1", "a@a.in", "pendrive2" , "abc", "13");
  newArray[0]="a@a.in:CASE:1";
  newArray[1]="pendrive";
  newArray[2]="123";
  newArray[3]="s123";
  newArray[4]="ABC";
  newArray[5]="Contain Records";
  newArray[6]="974568745";
  
  
  createEvid(newArray,"TIBIN","pro","123favsj12bb324hb12v412312b3","23/5/21","87459257222","a@a.in","34sd3234234affffeebbcc3234234");
  createEvid(newArray,"HARI","methd5","123favsj12bb324hb12v412312b3","23/5/21","87459257222","a@a.in","34sd3234234affffeebbcc3234234");
  }



function uintToString(uint v) private pure returns (string memory) {
    uint maxlength = 100;
    bytes memory reversed = new bytes(maxlength);
    uint i = 0;
    while (v != 0) {
        uint remainder = v % 10;
        v = v / 10;
        reversed[i++] = bytes1(uint8(48 + remainder));
    }
    bytes memory s = new bytes(i); // i + 1 is inefficient
    for (uint j = 0; j < i; j++) {
        s[j] = reversed[i - j - 1]; // to avoid the off-by-one error
    }
    string memory str = string(s);  // memory isn't implicitly convertible to storage
    return str;
}


function createCase(string memory _name, string memory _reason ,string memory _pid) public
{
 
 
string memory caseNumber= string(abi.encodePacked(_pid,":CASE:", uintToString(Cases[_pid].length+1)));

 

Cases[_pid].push(Case(_name,caseNumber,_reason,_pid));
t= Cases[_pid].length;
}


function createEvid(string[] memory _data,string memory _agent,string memory _method,string memory _hash,string memory _Time,string memory _agentInfo,string memory _pid,string memory _hashofhash) public
{

 
uint itemNo= Items[_data[0]].length+1;

Items[_data[0]].push(Item(_data,_agent,_method,_hash,_Time, _agentInfo,_pid,itemNo,_hashofhash));
}


function viewCase(string memory _pid) public view returns (Case[] memory)
{
  Case[] memory temp = Cases[_pid];
  return temp;
}

function viewEvid(string memory _caseNumber) public view returns (Item[] memory)
{
  Item[] memory temp = Items[_caseNumber];
  return temp;
}

function tvalue() public view returns (uint)
{
 return t;

}

}