from django.db.models.fields.files import ImageFieldFile
import pprint
import datetime
pp = pprint.PrettyPrinter().pprint


def to_dict(model, fields: list) -> dict:
    """
    fields = [
        ('actual_key', 'newKey'),
    ]
    """
    model = model.__dict__

    if '_state' in model.keys():
        model.pop('_state')
    if 'hash' in model.keys():
        model.pop('hash')

    if len(fields) == 0:
        return model
    else:
        new_model = {}
        for field in fields:
            attr = model[field[0]]
            if type(attr) in [datetime.date]:
                attr = attr.__str__()
            new_model[field[1]] = attr

        return new_model


def select_from_query(query, fields):
    if len(fields) == 1:
        field = fields[0]
        for obj in query:
            attr = obj.__getattribute__(field[0])
            if type(attr) in [ImageFieldFile, datetime.date]:
                yield attr.__str__()
            else:
                yield attr
    else:
        for obj in query:
            yield to_dict(obj, fields)


def select(model, key, value, fields: list):
    """
    fields = [
        ('actual_key', 'newKey'),
    ]
    """
    query = model.objects.filter(**{key: value})
    return select_from_query(query, fields)


def select_single(model, key, value, fields: list):
    """
    fields = [
        ('actual_key', 'newKey'),
    ]
    """
    try:
        query = model.objects.get(**{key: value})
        instances = list(select_from_query([query], fields))
        if len(instances) == 0:
            return None
        else:
            return instances[0]
    except model.DoesNotExist:
        return None
