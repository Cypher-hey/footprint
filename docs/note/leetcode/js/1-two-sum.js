/** 
 * @description One-pass Hash Table
 * @link https://leetcode.com/problems/two-sum/
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @see Time complexity : O(n)
 * @see Space complexity : O(n)
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let obj = {};
    let length = nums.length;

    for (let i = 0; i < length; i++) {
        if (undefined !== obj[target - nums[i]]) {
            return [obj[target - nums[i]], i];
        }
        obj[nums[i]] = i;
    }
};
