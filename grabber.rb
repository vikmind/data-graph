Rails.application.eager_load!
ApplicationRecord.descendants.map{|model|
  out = {}
  out[model.to_s] = model.reflect_on_all_associations.map{ |i|
    o = {}
    o[:assoc] = i.class.name.to_s.sub(/\w+\:{2}\w+:{2}/,'').sub('Reflection','')
    next if o[:assoc] == 'Through'
    o[:to] = i.name.to_s.classify
    o
  }.reject { |c| c.nil? }.uniq
  out
}.uniq.to_json
