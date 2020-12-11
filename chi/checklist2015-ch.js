function Liberal_cal() {
  var AdYear = Number(document.getElementById("ad-year").value);
  var College = document.getElementById("college_select").value;
  var elective_point = Number(document.getElementById("elective_liberal").value);
  var common_kor_point = Number(document.getElementById("common_kor").value);
  var common_eng_point = Number(document.getElementById("common_eng").value);
  var common_eng_ex = document.getElementById("eng_ex").checked;
  var common_etc_point = Number(document.getElementById("common_etc").value);
  var account_check_SF = document.getElementById("account_check").checked;
  var core_total_point = Number(document.getElementById("core_total").value);
  var MACH1 = Number(document.getElementById("mach1").value);
  var MACH1none = document.getElementById("mach1_none").checked;
  var MACH2 = Number(document.getElementById("mach2").value);
  var MACH2none = document.getElementById("mach2_none").checked;
  var MACH1_st = Number(document.getElementById("mach1_st").value);
  var MACH2_st = Number(document.getElementById("mach2_st").value);
  var liberal_total_point = Number(document.getElementById("liberal_total").value);
  var word = "👉入学年度 : " + AdYear + "年\n";

  if (College == "none") {
    document.getElementById("student-info").scrollIntoView();
    swal("请选择所属大学!", "", "error");
    return false;
  }

  if (common_kor_point < 2) {
    word += "👉共同教养\n - 국어 : 缺少" + [2 - common_kor_point] + "学分\n";
  } else {
    word += "👉共同教养\n - 국어 : 通过\n";
  }

  if (common_eng_point < 2 && common_eng_ex) {
    word += " - 英语 : 免\n"
  } else if (common_eng_point < 2 && !common_eng_ex) {
    word += " - 英语 : 缺少" + [2 - common_eng_point] + " 学分\n";
  } else {
    word += " - 英语 : 通过\n";
  }

  if (!account_check_SF) {
    if (common_etc_point < 8) {
      word += " - 其他 : 缺少" + [8 - common_etc_point] + " 学分\n"
    } else {
      word += " - 其他 : 通过\n"
    }
  } else {
    if (common_etc_point < 6) {
      word += " - 其他 : 缺少" + [6 - common_etc_point] + " 学分(회계와사회 : 免)\n"
    } else {
      word += " - 其他 : 通过(회계와사회 : 免)\n"
    }
  }

  if (core_total_point < 12) {
    word += "👉核心教养 : 缺少" + [12 - core_total_point] + " 学分\n- 核心教养的4种领域中每个领域需要进修1个以上的课程!"
  } else {
    word += "👉核心教养 : 通过最少学分\n- 确认核心教养各领域的进修情况（每个领域需要进修1个以上的课程!）"
  }

  word += "\n👉选择教养 : " + elective_point + " 学分"

  if (liberal_total_point <= 45) {
    word += "\n👉教养领域 总计 : 缺少" + liberal_total_point + " 学分 "
  } else {
    word += "\n👉教养领域 总计 : " + liberal_total_point + " 学分_ 超过" + [liberal_total_point - 45] + "学分（学分超过45学分时只认证45学分。）"
  }

  if (!MACH1none) {
    if (MACH1 < 4) {
      word += "\nMACH교양 : 缺少" + [4 - MACH1] + " 学分"
    } else {
      word += "\nMACH교양 : 通过"
    }
  }

  if (!MACH2none) {
    if (MACH2 < 4) {
      word += "\nMACH실습 : 缺少" + [2 - MACH2] + " 学分"
    } else {
      word += "\nMACH실습 : 通过"
    }
  }

  if (common_kor_point == 2 && core_total_point >= 11 && MACH1 >= MACH1_st && MACH2 >= MACH2_st) {
    if (common_eng_point == 2 && common_etc_point == 8) {
      swal("教养领域结果", word, "success")
    } else if (common_eng_point <= 2 && common_eng_ex && common_etc_point == 8) {
      swal("教养领域结果", word, "success")
    } else if (common_eng_point == 2 && common_etc_point >= 6 && account_check_SF) {
      swal("教养领域结果", word, "success")
    } else if (common_eng_point <= 2 && common_eng_ex && common_etc_point >= 6 && account_check_SF) {
      swal("教养领域结果", word, "success")
    } else {
      swal("教养领域结果", word, "error")
    }
  } else {
    swal("教养领域结果", word, "error")
  }
}

// 여기서부터는 전공영역

function BaseNeceresult(Majorstandard) {
  var AdYear = Number(document.getElementById("ad-year").value);
  var Major = document.getElementById("Major_select");
  var Majortext = Major.options[Major.selectedIndex].text;
  var Multimajor = document.getElementById("MultiMajor_select");
  var Multimajortext = Multimajor.options[Multimajor.selectedIndex].text;
  var BaseStandard = document.getElementById("base_standard").value;
  var NeceStandard = document.getElementById("nece_standard").value;
  var Basepoint = Number(document.getElementById("base_input").value);
  var Necepoint = Number(document.getElementById("nece_input").value);
  var Majorpoint = Number(document.getElementById("major_input").value);
  Majorstandard = Number(Majorstandard);
  var word = "👉入学年度 : " + AdYear + "年";

  if (Majortext.includes("트랙")) {
    word += "\n👉主专业 : 공공인재학부" + Majortext + "\n👉多专业 : " + Multimajortext + "\n";
  } else {
    word += "\n👉主专业 : " + Majortext + "\n👉多专业 : " + Multimajortext + "\n";
  }

  var FusionOption = Number(document.getElementById("fusion-options").value);
  if (Multimajortext.includes("融合")) {
    if (FusionOption == 0) {
      swal("请选择细部融合专业（세부융합전공）!", "", "error");
      document.getElementById("double_major_none").scrollIntoView();
      return false;
    }
  }

  if (Majorpoint < Necepoint) {
    swal("专业课程包括专业必修!", "", "error");
    return false;
  }

  if (Basepoint < BaseStandard) {
    word += "👉专业基础 : 缺少" + [BaseStandard - Basepoint] + " 学分\n";
  } else {
    word += "👉专业基础 : 通过\n";
  }

  if (Necepoint < NeceStandard) {
    word += "👉专业必修 : 缺少" + [NeceStandard - Necepoint] + " 学分\n";
  } else {
    word += "👉专业必修 : 通过\n";
  }

  if (Majorpoint < Majorstandard) {
    word += "👉专业课程 : 缺少" + [Majorstandard - Majorpoint] + " 学分\n"
  } else {
    word += "👉专业课程 : 通过\n"
  }

  var Doublecheck = document.getElementById("double_major_none").checked;
  var Doublepoint = Number(document.getElementById("double_major_point").value);
  if (!Doublecheck) {
    if (Doublepoint < 45) {
      word += "👉双专业 : 缺少" + [45 - Doublepoint] + " 学分\n"
    } else {
      word += "👉双专业 : 通过最少学分\n"
    }
  }

  var Linkcheck = document.getElementById("link_major_none").checked;
  var LinkCross = Number(document.getElementById("cross_point1").value);
  var Linkpoint = Number(document.getElementById("link_major_point").value) + LinkCross;
  if (!Linkcheck) {
    if (Linkpoint < 36) {
      word += "👉연계전공 : 缺少" + [36 - Linkpoint] + " 学分\n"
    } else {
      word += "👉연계전공 : 通过最少学分\n"
    }
  }

  var Fusioncheck = document.getElementById("fusion_major_none").checked;
  var Fusion = document.getElementById("fusion-options");
  var Fusiontext = Fusion.options[Fusion.selectedIndex].text;
  var Fusionpoint = Number(document.getElementById("fusion_major_point").value) + Number(document.getElementById("cross_point2").value);
  var FusionStandard = Number(document.getElementById("fusion_standard").value);
  if (!Fusioncheck) {
    if (Fusionpoint < FusionStandard) {
      word += "👉" + Fusiontext + "융합전공 : 缺少" + [FusionStandard - Fusionpoint] + " 学分\n"
    } else {
      word += "👉" + Fusiontext + "융합전공 : 通过最少学分\n"
    }
  }

  var Plancheck = document.getElementById("plan_major_none").checked;
  var Planpoint = Number(document.getElementById("plan_major_point").value) + Number(document.getElementById("cross_point3").value);
  if (!Plancheck) {
    if (Planpoint < 36) {
      word += "👉설계전공 : 缺少" + [36 - Planpoint] + " 学分\n"
    } else {
      word += "👉설계전공 : 通过最少学分\n"
    }
  }

  var Minorcheck = document.getElementById("minor_none").checked;
  var Minorpoint = Number(document.getElementById("minor_point").value);
  if (!Minorcheck) {
    if (Minorpoint < 21) {
      word += "👉부전공 : 缺少" + [21 - Minorpoint] + " 学分\n"
    } else {
      word += "👉부전공 : 通过最少学分\n"
    }
  }

  var Freepoint = Number(document.getElementById("free_point").value);
  word += "👉자유선택 : " + Freepoint + " 学分\n"

  var Teachingcheck = document.getElementById("teaching_none").checked;
  var Teachingpoint = Number(document.getElementById("teaching_point").value);
  if (!Teachingcheck) {
    if (Teachingpoint < 22)
      word += "👉교직이수 :  缺少" + [22 - Teachingpoint] + " 学分\n"
    else {
      word += "👉교직이수 : 通过最少学分\n"
    }
  }

  var TotalStandard = Number(document.getElementById("total_standard").value);
  var TotalPoint = Number(document.getElementById("the_total").value);
  if (TotalPoint < TotalStandard) {
    word += "👉总进修学分 : 缺少" + [TotalStandard - TotalPoint] + " 学分"
  } else {
    word += "👉总进修学分 : 通过"
  }

  if (Basepoint >= BaseStandard && Necepoint >= NeceStandard && Majorpoint >= Majorstandard && TotalPoint >= TotalStandard) {
    if (Minorcheck && Teachingcheck) {
      if (Multimajortext.includes("심화")) {
        swal("专业领域结果", word, "success")
      } else if (Multimajortext.includes("복수")) {
        if (Doublepoint >= 45) {
          swal("专业领域结果", word, "success")
        } else {
          swal("专业领域结果", word, "error")
        }
      } else if (Multimajortext.includes("연계")) {
        if (Linkpoint >= 36) {
          swal("专业领域结果", word, "success")
        } else {
          swal("专业领域结果", word, "error")
        }
      } else if (Multimajortext.includes("융합")) {
        if (Fusionpoint >= FusionStandard) {
          swal("专业领域结果", word, "success")
        } else {
          swal("专业领域结果", word, "error")
        }
      } else if (Multimajortext.includes("설계")) {
        if (Planpoint >= 36) {
          swal("专业领域结果", word, "success")
        } else {
          swal("专业领域结果", word, "error")
        }
      }
    } else if (Minorpoint >= 21 && Teachingcheck) {
      if (Multimajortext.includes("심화")) {
        swal("专业领域结果", word, "success")
      } else if (Multimajortext.includes("복수")) {
        if (Doublepoint >= 45) {
          swal("专业领域结果", word, "success")
        } else {
          swal("专业领域结果", word, "error")
        }
      } else if (Multimajortext.includes("연계")) {
        if (Linkpoint >= 36) {
          swal("专业领域结果", word, "success")
        } else {
          swal("专业领域结果", word, "error")
        }
      } else if (Multimajortext.includes("융합")) {
        if (Fusionpoint >= FusionStandard) {
          swal("专业领域结果", word, "success")
        } else {
          swal("专业领域结果", word, "error")
        }
      } else if (Multimajortext.includes("설계")) {
        if (Planpoint >= 36) {
          swal("专业领域结果", word, "success")
        } else {
          swal("专业领域结果", word, "error")
        }
      }
    } else if (Minorpoint >= 21 && Teachingpoint >= 22) {
      if (Multimajortext.includes("심화")) {
        swal("专业领域结果", word, "success")
      } else if (Multimajortext.includes("복수")) {
        if (Doublepoint >= 45) {
          swal("专业领域结果", word, "success")
        } else {
          swal("专业领域结果", word, "error")
        }
      } else if (Multimajortext.includes("연계")) {
        if (Linkpoint >= 36) {
          swal("专业领域结果", word, "success")
        } else {
          swal("专业领域结果", word, "error")
        }
      } else if (Multimajortext.includes("융합")) {
        if (Fusionpoint >= FusionStandard) {
          swal("专业领域结果", word, "success")
        } else {
          swal("专业领域结果", word, "error")
        }
      } else if (Multimajortext.includes("설계")) {
        if (Planpoint >= 36) {
          swal("专业领域结果", word, "success")
        } else {
          swal("专业领域结果", word, "error")
        }
      }
    } else if (Minorcheck && Teachingpoint >= 22) {
      if (Multimajortext.includes("심화")) {
        swal("专业领域结果", word, "success")
      } else if (Multimajortext.includes("복수")) {
        if (Doublepoint >= 45) {
          swal("专业领域结果", word, "success")
        } else {
          swal("专业领域结果", word, "error")
        }
      } else if (Multimajortext.includes("연계")) {
        if (Linkpoint >= 36) {
          swal("专业领域结果", word, "success")
        } else {
          swal("专业领域结果", word, "error")
        }
      } else if (Multimajortext.includes("융합")) {
        if (Fusionpoint >= FusionStandard) {
          swal("专业领域结果", word, "success")
        } else {
          swal("专业领域结果", word, "error")
        }
      } else if (Multimajortext.includes("설계")) {
        if (Planpoint >= 36) {
          swal("专业领域结果", word, "success")
        } else {
          swal("专业领域结果", word, "error")
        }
      }
    } else {
      swal("专业领域结果", word, "error")
    }
  } else {
    swal("专业领域结果", word, "error")
  }
}
